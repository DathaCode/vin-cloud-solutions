import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Html, Line, OrbitControls, Sparkles, useCursor, useTexture } from '@react-three/drei';
import { isCoarsePointer, prefersReducedMotion, createGlowMaterial, useLabelsReady } from './utils';

const RING = 2.5;

const Core = () => {
    const shell = useRef();
    const mark = useTexture('/brand/vin-mark.png');
    const glow = useMemo(() => createGlowMaterial('#67E8F9', 0.9, 2.6), []);

    useFrame((_, delta) => {
        if (!shell.current) return;
        shell.current.rotation.y += delta * 0.25;
        shell.current.rotation.x += delta * 0.1;
    });

    return (
        <group>
            <mesh ref={shell}>
                <icosahedronGeometry args={[0.95, 1]} />
                <meshBasicMaterial color="#7CC4DA" wireframe transparent opacity={0.35} />
            </mesh>
            <mesh material={glow}>
                <sphereGeometry args={[0.8, 48, 48]} />
            </mesh>
            <Billboard>
                <mesh>
                    <circleGeometry args={[0.52, 64]} />
                    <meshBasicMaterial color="#F2F8FB" />
                </mesh>
                <mesh position={[0, 0, 0.01]}>
                    <planeGeometry args={[0.6 * (234 / 256), 0.6]} />
                    <meshBasicMaterial map={mark} transparent toneMapped={false} />
                </mesh>
            </Billboard>
        </group>
    );
};

const PlatformNode = ({ platform, position, selected, onSelect }) => {
    const [hovered, setHovered] = useState(false);
    const labelsReady = useLabelsReady();
    useCursor(hovered);
    const ref = useRef();
    const glow = useMemo(() => createGlowMaterial(platform.color, 0.9, 2.6), [platform.color]);
    const scale = useMemo(() => new THREE.Vector3(), []);

    useFrame((_, delta) => {
        if (!ref.current) return;
        const target = selected ? 1.35 : hovered ? 1.15 : 1;
        ref.current.scale.lerp(scale.setScalar(target), Math.min(1, delta * 8));
        ref.current.rotation.y += delta * 0.6;
    });

    return (
        <group position={position}>
            <group
                ref={ref}
                onClick={(e) => { e.stopPropagation(); onSelect(platform.id); }}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                onPointerOut={() => setHovered(false)}
            >
                <mesh>
                    <octahedronGeometry args={[0.26, 0]} />
                    <meshStandardMaterial color={platform.color} emissive={platform.color} emissiveIntensity={selected ? 0.9 : 0.45} metalness={0.3} roughness={0.25} flatShading />
                </mesh>
                <mesh material={glow} scale={1.45}>
                    <sphereGeometry args={[0.26, 32, 32]} />
                </mesh>
                {/* Larger invisible hit area for easier clicking/tapping */}
                <mesh visible={false}>
                    <sphereGeometry args={[0.5, 8, 8]} />
                </mesh>
            </group>
            {labelsReady && <Html center position={[0, -0.6, 0]} zIndexRange={[20, 0]}>
                <button
                    type="button"
                    onClick={() => onSelect(platform.id)}
                    className={`whitespace-nowrap rounded-full border px-3 py-1 font-mono text-xs backdrop-blur transition-colors ${
                        selected ? 'border-glow/60 bg-ink-900/90 text-white' : 'border-white/15 bg-ink-900/70 text-slate-300 hover:text-white'
                    }`}
                    tabIndex={-1}
                >
                    {platform.name}
                </button>
            </Html>}
        </group>
    );
};

const Connection = ({ to, selected, color }) => {
    const pulse = useRef();
    const curve = useMemo(() => {
        const mid = to.clone().multiplyScalar(0.5).add(new THREE.Vector3(0, 0.45, 0));
        return new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), mid, to);
    }, [to]);
    const points = useMemo(() => curve.getPoints(40), [curve]);

    useFrame(({ clock }) => {
        if (!pulse.current) return;
        pulse.current.position.copy(curve.getPoint((clock.elapsedTime * (selected ? 0.7 : 0.25)) % 1));
    });

    return (
        <group>
            <Line points={points} color={selected ? color : '#5AAFC8'} lineWidth={selected ? 2 : 1} transparent opacity={selected ? 0.9 : 0.25} />
            <mesh ref={pulse}>
                <sphereGeometry args={[selected ? 0.045 : 0.025, 12, 12]} />
                <meshBasicMaterial color={selected ? color : '#67E8F9'} toneMapped={false} />
            </mesh>
        </group>
    );
};

const Orbit = ({ platforms, activeId, onSelect }) => {
    const ring = useRef();
    const reduce = prefersReducedMotion();
    const count = platforms.length;
    const positions = useMemo(
        () => platforms.map((_, i) => {
            const a = (i / count) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(a) * RING, Math.sin(a * 2) * 0.25, Math.sin(a) * RING);
        }),
        [platforms, count]
    );

    // Rotate the ring so the selected platform swings to the front (+z), taking the short way round.
    const current = useRef(0);
    useFrame((_, delta) => {
        if (!ring.current) return;
        const index = platforms.findIndex((p) => p.id === activeId);
        const target = (index / count) * Math.PI * 2 - Math.PI / 2;
        const diff = Math.atan2(Math.sin(target - current.current), Math.cos(target - current.current));
        current.current += diff * Math.min(1, delta * (reduce ? 20 : 3));
        ring.current.rotation.y = current.current;
    });

    return (
        <group ref={ring}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[RING, 0.004, 8, 200]} />
                <meshBasicMaterial color="#7CC4DA" transparent opacity={0.3} />
            </mesh>
            {platforms.map((p, i) => (
                <React.Fragment key={p.id}>
                    <Connection to={positions[i]} selected={p.id === activeId} color={p.color} />
                    <PlatformNode platform={p} position={positions[i]} selected={p.id === activeId} onSelect={onSelect} />
                </React.Fragment>
            ))}
        </group>
    );
};

const EcosystemScene = ({ active = true, platforms, activeId, onSelect, ariaLabel }) => {
    const interactive = !isCoarsePointer();

    return (
        <Canvas
            frameloop={active ? 'always' : 'never'}
            dpr={[1, 1.75]}
            camera={{ position: [0, 3.6, 8.4], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            aria-label={ariaLabel}
            role="img"
        >
            <ambientLight intensity={0.6} />
            <pointLight position={[4, 5, 4]} intensity={40} color="#CDEAF3" />
            <pointLight position={[-5, -2, -3]} intensity={20} color="#A78BFA" />
            <group rotation={[0.08, 0, 0]}>
                <Core />
                <Orbit platforms={platforms} activeId={activeId} onSelect={onSelect} />
            </group>
            <Sparkles count={70} scale={[9, 5, 9]} size={2} speed={0.3} color="#7CC4DA" opacity={0.5} />
            {interactive && (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.4}
                    minPolarAngle={Math.PI / 3.2}
                    maxPolarAngle={Math.PI / 1.9}
                    minAzimuthAngle={-Math.PI / 4}
                    maxAzimuthAngle={Math.PI / 4}
                />
            )}
        </Canvas>
    );
};

export default EcosystemScene;
