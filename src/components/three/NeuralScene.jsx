import React, { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { isCoarsePointer, prefersReducedMotion, useLabelsReady } from './utils';

const DEFAULT_INPUTS = ['Documents', 'Tickets', 'Email & chat', 'Databases', 'Images & forms'];
const HIDDEN = [7, 7];
const PULSES = 70;
const BASE = new THREE.Color('#5AAFC8');
const HOT = new THREE.Color('#67E8F9');
const AI = new THREE.Color('#A78BFA');

const buildLayers = (outputs, inputCount) => {
    const sizes = [inputCount, ...HIDDEN, outputs.length];
    const xs = [-3.1, -1.05, 1.05, 3.1];
    return sizes.map((n, li) =>
        Array.from({ length: n }, (_, i) => {
            const y = ((n - 1) / 2 - i) * (li === 0 || li === sizes.length - 1 ? 0.78 : 0.6);
            const z = li === 0 || li === sizes.length - 1 ? 0 : Math.sin(i * 1.7 + li) * 0.6;
            return new THREE.Vector3(xs[li], y, z);
        })
    );
};

const Network = ({ outputs, inputs, activeIndex }) => {
    const group = useRef();
    const pulses = useRef();
    const reduce = prefersReducedMotion();
    const layers = useMemo(() => buildLayers(outputs, inputs.length), [outputs, inputs.length]);
    const nodes = useMemo(() => layers.flatMap((layer, li) => layer.map((p, i) => ({ p, li, i }))), [layers]);
    const last = layers.length - 1;
    const labelsReady = useLabelsReady();

    const edgeGeometry = useMemo(() => {
        const pts = [];
        for (let l = 0; l < last; l++) {
            layers[l].forEach((a) => layers[l + 1].forEach((b) => pts.push(a.x, a.y, a.z, b.x, b.y, b.z)));
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        return g;
    }, [layers, last]);

    const hotEdgeGeometry = useMemo(() => {
        const target = layers[last][activeIndex];
        const pts = [];
        layers[last - 1].forEach((a) => pts.push(a.x, a.y, a.z, target.x, target.y, target.z));
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        return g;
    }, [layers, last, activeIndex]);

    // Each pulse walks input → hidden → hidden → output; most are routed to the active output.
    const state = useRef(null);
    const makePath = () => {
        const pick = (l) => layers[l][Math.floor(Math.random() * layers[l].length)];
        const end = Math.random() < 0.75 ? layers[last][activeIndex] : pick(last);
        return { path: [pick(0), pick(1), pick(2), end], hot: end === layers[last][activeIndex] };
    };
    if (!state.current) {
        state.current = Array.from({ length: PULSES }, () => ({ ...makePath(), t: Math.random() * 3, speed: 0.5 + Math.random() * 0.6 }));
    }
    useLayoutEffect(() => {
        state.current.forEach((p, i) => {
            Object.assign(p, makePath());
            // Instance colors must exist before the first render so the shader compiles with them.
            pulses.current?.setColorAt(i, p.hot ? HOT : AI);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const tmp = useMemo(() => new THREE.Vector3(), []);

    useFrame(({ clock, pointer }, delta) => {
        if (group.current) {
            const sway = reduce ? 0 : Math.sin(clock.elapsedTime * 0.3) * 0.25;
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, sway + pointer.x * 0.25, 0.05);
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.15, 0.05);
        }
        if (!pulses.current) return;
        state.current.forEach((p, idx) => {
            p.t += delta * p.speed * (reduce ? 0.3 : 1);
            if (p.t >= 3) {
                Object.assign(p, makePath());
                p.t = 0;
            }
            const seg = Math.min(2, Math.floor(p.t));
            tmp.copy(p.path[seg]).lerp(p.path[seg + 1], p.t - seg);
            dummy.position.copy(tmp);
            dummy.scale.setScalar(p.hot ? 1 : 0.65);
            dummy.updateMatrix();
            pulses.current.setMatrixAt(idx, dummy.matrix);
            pulses.current.setColorAt(idx, p.hot ? HOT : AI);
        });
        pulses.current.instanceMatrix.needsUpdate = true;
        if (pulses.current.instanceColor) pulses.current.instanceColor.needsUpdate = true;
    });

    return (
        <group ref={group}>
            <lineSegments geometry={edgeGeometry}>
                <lineBasicMaterial color={BASE} transparent opacity={0.12} depthWrite={false} />
            </lineSegments>
            <lineSegments geometry={hotEdgeGeometry}>
                <lineBasicMaterial color={HOT} transparent opacity={0.55} depthWrite={false} />
            </lineSegments>

            {nodes.map(({ p, li, i }) => {
                const isOut = li === last;
                const isActive = isOut && i === activeIndex;
                return (
                    <group key={`${li}-${i}`} position={p}>
                        <mesh scale={isActive ? 1.6 : 1}>
                            <sphereGeometry args={[li === 0 || isOut ? 0.09 : 0.065, 20, 20]} />
                            <meshBasicMaterial color={isActive ? '#ffffff' : isOut ? '#A78BFA' : li === 0 ? '#7CC4DA' : '#4588A0'} toneMapped={false} />
                        </mesh>
                        {labelsReady && (li === 0 || isOut) && (
                            <Html zIndexRange={[20, 0]} style={{ transform: li === 0 ? 'translate(calc(-100% - 14px), -50%)' : 'translate(14px, -50%)' }}>
                                <span
                                    className={`pointer-events-none block whitespace-nowrap rounded-md border px-2 py-0.5 font-mono text-[11px] ${
                                        isActive
                                            ? 'border-glow/60 bg-ink-900/90 text-white'
                                            : 'border-white/10 bg-ink-900/70 text-slate-400'
                                    }`}
                                >
                                    {li === 0 ? inputs[i] : outputs[i]}
                                </span>
                            </Html>
                        )}
                    </group>
                );
            })}

            <instancedMesh ref={pulses} args={[undefined, undefined, PULSES]}>
                <sphereGeometry args={[0.035, 10, 10]} />
                <meshBasicMaterial toneMapped={false} />
            </instancedMesh>
        </group>
    );
};

const NeuralScene = ({ active = true, outputs, inputs = DEFAULT_INPUTS, activeIndex = 0, ariaLabel }) => {
    const interactive = !isCoarsePointer();

    return (
        <Canvas
            frameloop={active ? 'always' : 'never'}
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 7.4], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            aria-label={ariaLabel}
            role="img"
        >
            <Network outputs={outputs} inputs={inputs} activeIndex={activeIndex} />
            {interactive && (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.4}
                    minAzimuthAngle={-Math.PI / 5}
                    maxAzimuthAngle={Math.PI / 5}
                    minPolarAngle={Math.PI / 2.6}
                    maxPolarAngle={Math.PI / 1.6}
                />
            )}
        </Canvas>
    );
};

export default NeuralScene;
