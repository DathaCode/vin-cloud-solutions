import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, OrbitControls } from '@react-three/drei';
import { latLonToVec3, isCoarsePointer, prefersReducedMotion, createGlowMaterial, useLabelsReady } from './utils';

const RADIUS = 1.6;
const HUB = { name: 'VIN Cloud · South Asia', lat: 15, lon: 78 };
const REGIONS = [
    { name: 'Singapore', lat: 1.35, lon: 103.8 },
    { name: 'Tokyo', lat: 35.7, lon: 139.7 },
    { name: 'Sydney', lat: -33.9, lon: 151.2 },
    { name: 'Dubai', lat: 25.2, lon: 55.3 },
    { name: 'Frankfurt', lat: 50.1, lon: 8.7 },
    { name: 'London', lat: 51.5, lon: -0.1 },
    { name: 'N. Virginia', lat: 38.9, lon: -77.4 },
    { name: 'São Paulo', lat: -23.5, lon: -46.6 },
];

const DotSphere = () => {
    const geometry = useMemo(() => {
        const count = 2600;
        const positions = [];
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = golden * i;
            // Thin out the dots with noise so the surface reads as "data", not a grid.
            const n = Math.sin(theta * 3.1) * Math.cos(y * 9.0) + Math.sin(i * 0.37);
            if (n < -0.35) continue;
            positions.push(Math.cos(theta) * r * RADIUS, y * RADIUS, Math.sin(theta) * r * RADIUS);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        return g;
    }, []);

    return (
        <points geometry={geometry}>
            <pointsMaterial size={0.034} color="#7CC4DA" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
        </points>
    );
};

const Arc = ({ from, to, index }) => {
    const pulse = useRef();
    const curve = useMemo(() => {
        const mid = from.clone().add(to).multiplyScalar(0.5);
        const lift = RADIUS + from.distanceTo(to) * 0.45;
        mid.normalize().multiplyScalar(lift);
        return new THREE.QuadraticBezierCurve3(from, mid, to);
    }, [from, to]);
    const points = useMemo(() => curve.getPoints(60), [curve]);

    useFrame(({ clock }) => {
        const t = (clock.elapsedTime * 0.28 + index * 0.17) % 1;
        pulse.current?.position.copy(curve.getPoint(t));
    });

    return (
        <group>
            <Line points={points} color="#5AAFC8" lineWidth={1} transparent opacity={0.45} />
            <mesh ref={pulse}>
                <sphereGeometry args={[0.022, 12, 12]} />
                <meshBasicMaterial color="#67E8F9" toneMapped={false} />
            </mesh>
        </group>
    );
};

const Node = ({ position, label, hub = false, occluder }) => {
    const [hovered, setHovered] = useState(false);
    const labelsReady = useLabelsReady();
    const ring = useRef();
    const normal = useMemo(() => position.clone().normalize(), [position]);
    const quaternion = useMemo(
        () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal),
        [normal]
    );

    useFrame(({ clock }) => {
        if (!ring.current) return;
        const s = 1 + ((clock.elapsedTime * (hub ? 0.8 : 0.5)) % 1) * (hub ? 3 : 1.6);
        ring.current.scale.setScalar(s);
        ring.current.material.opacity = Math.max(0, 1 - (s - 1) / (hub ? 3 : 1.6)) * 0.8;
    });

    return (
        <group position={position}>
            <mesh
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[hub ? 0.055 : 0.035, 16, 16]} />
                <meshBasicMaterial color={hub ? '#ffffff' : '#67E8F9'} toneMapped={false} />
            </mesh>
            <mesh ref={ring} quaternion={quaternion}>
                <ringGeometry args={[0.05, 0.065, 32]} />
                <meshBasicMaterial color={hub ? '#67E8F9' : '#7CC4DA'} transparent side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
            {labelsReady && (hovered || hub) && (
                <Html center occlude={[occluder]} position={normal.clone().multiplyScalar(0.18)} zIndexRange={[20, 0]}>
                    <span className={`pointer-events-none whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] backdrop-blur ${hub ? 'border-glow/40 bg-ink-900/80 text-glow' : 'border-white/15 bg-ink-900/80 text-slate-200'}`}>
                        {label}
                    </span>
                </Html>
            )}
        </group>
    );
};

const Globe = ({ interactive, labels }) => {
    const group = useRef();
    const reduce = prefersReducedMotion();
    const hub = useMemo(() => latLonToVec3(HUB.lat, HUB.lon, RADIUS), []);
    const regions = useMemo(() => REGIONS.map((r) => ({ ...r, pos: latLonToVec3(r.lat, r.lon, RADIUS) })), []);
    const glow = useMemo(() => createGlowMaterial('#4588A0', 1.1, 3), []);
    const body = useRef();

    useFrame(({ pointer }, delta) => {
        if (!group.current) return;
        // Gentle parallax toward the cursor; auto-spin when controls aren't driving it.
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.25 + pointer.y * 0.12, 0.05);
        if (!interactive && !reduce) group.current.rotation.y += delta * 0.08;
    });

    return (
        <group ref={group} rotation={[0.25, Math.PI + 0.2, 0]}>
            <mesh ref={body}>
                <sphereGeometry args={[RADIUS * 0.985, 48, 48]} />
                <meshBasicMaterial color="#0A1A26" transparent opacity={0.92} />
            </mesh>
            <mesh scale={1.14} material={glow}>
                <sphereGeometry args={[RADIUS, 48, 48]} />
            </mesh>
            <DotSphere />
            <Node position={hub} label={labels?.hub || HUB.name} hub occluder={body} />
            {regions.map((r, i) => (
                <React.Fragment key={r.name}>
                    <Node position={r.pos} label={(labels?.region || '{name} cloud region').replace('{name}', labels?.cities?.[r.name] || r.name)} occluder={body} />
                    <Arc from={hub} to={r.pos} index={i} />
                </React.Fragment>
            ))}
            {/* Orbital rings */}
            <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
                <torusGeometry args={[RADIUS * 1.42, 0.003, 8, 160]} />
                <meshBasicMaterial color="#7CC4DA" transparent opacity={0.35} />
            </mesh>
            <mesh rotation={[Math.PI / 1.8, -0.5, 0.3]}>
                <torusGeometry args={[RADIUS * 1.62, 0.002, 8, 160]} />
                <meshBasicMaterial color="#A78BFA" transparent opacity={0.25} />
            </mesh>
        </group>
    );
};

const HeroGlobe = ({ active = true, labels }) => {
    const interactive = !isCoarsePointer();
    const reduce = prefersReducedMotion();

    return (
        <Canvas
            frameloop={active ? 'always' : 'never'}
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 5.4], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            aria-label={labels?.aria}
            role="img"
        >
            <Globe interactive={interactive} labels={labels} />
            {interactive && (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={!reduce}
                    autoRotateSpeed={0.5}
                    rotateSpeed={0.45}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI - Math.PI / 3}
                />
            )}
        </Canvas>
    );
};

export default HeroGlobe;
