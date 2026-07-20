"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls, RoundedBox } from "@react-three/drei";
import { animate } from "animejs";
import type { Group, MeshStandardMaterial } from "three";
import type { LayerResult } from "@/types/recommend";
import { prefersReducedMotion } from "@/lib/motion/animeReveal";

type NodeData = {
  id: string;
  role: string;
  name: string;
  confidence?: number;
  position: [number, number, number];
  color: string;
};

type EdgeData = {
  from: [number, number, number];
  to: [number, number, number];
};

const ROLE_COLORS: Record<string, string> = {
  Frontend: "#3b82f6",
  "Full-Stack": "#6366f1",
  Backend: "#8b5cf6",
  Database: "#10b981",
  Realtime: "#f59e0b",
  Hosting: "#64748b",
  User: "#94a3b8",
};

const NODE_STAGGER_MS = 160;
const NODE_DURATION_MS = 420;
const EDGE_DURATION_MS = 500;
const SLIDE_OFFSET = 0.55;

function computeLayout(layers: LayerResult[]): {
  nodes: NodeData[];
  edges: EdgeData[];
} {
  const nodes: NodeData[] = [];
  const edges: EdgeData[] = [];

  const userPos: [number, number, number] = [0, 3, 0];
  nodes.push({
    id: "user",
    role: "User",
    name: "User / Browser",
    position: userPos,
    color: ROLE_COLORS.User,
  });

  const frontendLayer = layers.find(
    (l) => l.role === "Frontend" || l.role === "Full-Stack",
  );
  const backendLayer = layers.find((l) => l.role === "Backend");
  const databaseLayer = layers.find((l) => l.role === "Database");
  const realtimeLayer = layers.find((l) => l.role === "Realtime");
  const hostingLayer = layers.find((l) => l.role === "Hosting");

  const frontendPos: [number, number, number] = [0, 1.2, 0];
  const backendPos: [number, number, number] = [-2.5, -0.5, 0];
  const databasePos: [number, number, number] = backendLayer
    ? [-2.5, -2.2, 0]
    : [0, -0.5, 0];
  const realtimePos: [number, number, number] = [2.5, -0.5, 0];
  const hostingPos: [number, number, number] = [0, -3.2, 0];

  if (frontendLayer) {
    nodes.push({
      id: "frontend",
      role: frontendLayer.role,
      name: frontendLayer.primary.name,
      confidence: frontendLayer.primary.confidence,
      position: frontendPos,
      color: ROLE_COLORS[frontendLayer.role] ?? "#3b82f6",
    });
    edges.push({ from: userPos, to: frontendPos });
  }

  if (backendLayer) {
    nodes.push({
      id: "backend",
      role: "Backend",
      name: backendLayer.primary.name,
      confidence: backendLayer.primary.confidence,
      position: backendPos,
      color: ROLE_COLORS.Backend,
    });
    edges.push({ from: frontendPos, to: backendPos });
  }

  if (databaseLayer) {
    nodes.push({
      id: "database",
      role: "Database",
      name: databaseLayer.primary.name,
      confidence: databaseLayer.primary.confidence,
      position: databasePos,
      color: ROLE_COLORS.Database,
    });
    const fromPos = backendLayer ? backendPos : frontendPos;
    edges.push({ from: fromPos, to: databasePos });
  }

  if (realtimeLayer) {
    nodes.push({
      id: "realtime",
      role: "Realtime",
      name: realtimeLayer.primary.name,
      confidence: realtimeLayer.primary.confidence,
      position: realtimePos,
      color: ROLE_COLORS.Realtime,
    });
    edges.push({ from: frontendPos, to: realtimePos });
    if (backendLayer) edges.push({ from: backendPos, to: realtimePos });
  }

  if (hostingLayer) {
    nodes.push({
      id: "hosting",
      role: "Hosting",
      name: hostingLayer.primary.name,
      confidence: hostingLayer.primary.confidence,
      position: hostingPos,
      color: ROLE_COLORS.Hosting,
    });
    edges.push({ from: frontendPos, to: hostingPos });
    if (backendLayer) edges.push({ from: backendPos, to: hostingPos });
  }

  return { nodes, edges };
}

function Node({
  data,
  reveal,
}: {
  data: NodeData;
  reveal: number;
}) {
  const group = useRef<Group>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  const isUser = data.id === "user";
  const baseOpacity = isUser ? 0.55 : 0.92;

  useFrame((state) => {
    if (!group.current) return;

    const float =
      Math.sin(state.clock.elapsedTime * 0.7 + data.position[0]) * 0.055;
    const startY = data.position[1] + SLIDE_OFFSET;
    const endY = data.position[1];
    group.current.position.y =
      startY + (endY - startY) * reveal + float * reveal;
    group.current.position.x = data.position[0];
    group.current.position.z = data.position[2];

    if (materialRef.current) {
      materialRef.current.opacity = baseOpacity * reveal;
    }
  });

  return (
    <group ref={group} position={data.position}>
      <RoundedBox args={[2.6, 0.85, 0.12]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          ref={materialRef}
          color={data.color}
          emissive={data.color}
          emissiveIntensity={0.15}
          metalness={0.2}
          roughness={0.6}
          transparent
          opacity={0}
        />
      </RoundedBox>

      <Html
        center
        distanceFactor={6}
        style={{
          pointerEvents: "none",
          userSelect: "none",
          opacity: reveal,
        }}
      >
        <div
          style={{
            width: 164,
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {!isUser && (
            <p
              style={{
                margin: 0,
                fontSize: 9,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 2,
              }}
            >
              {data.role}
            </p>
          )}
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "#fff",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {data.name}
          </p>
          {data.confidence !== undefined && (
            <p
              style={{
                margin: 0,
                fontSize: 10,
                color: "rgba(255,255,255,0.38)",
                marginTop: 3,
              }}
            >
              {data.confidence}% match
            </p>
          )}
        </div>
      </Html>
    </group>
  );
}

function Edge({
  from,
  to,
  reveal,
}: EdgeData & { reveal: number }) {
  const mid: [number, number, number] = [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2 - 0.25,
  ];

  return (
    <Line
      points={[from, mid, to]}
      color="#334155"
      lineWidth={1.5}
      transparent
      opacity={reveal}
    />
  );
}

function Scene({
  layers,
  nodeReveals,
  edgeReveal,
}: {
  layers: LayerResult[];
  nodeReveals: number[];
  edgeReveal: number;
}) {
  const { nodes, edges } = useMemo(() => computeLayout(layers), [layers]);

  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      <pointLight position={[-3, -4, 2]} intensity={0.5} color="#6366f1" />

      {edges.map((edge, i) => (
        <Edge key={i} from={edge.from} to={edge.to} reveal={edgeReveal} />
      ))}
      {nodes.map((node, i) => (
        <Node
          key={node.id}
          data={node}
          reveal={nodeReveals[i] ?? 1}
        />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={14}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}

type StackDiagramSceneProps = {
  layers: LayerResult[];
  onIntroComplete?: () => void;
};

export default function StackDiagramScene({
  layers,
  onIntroComplete,
}: StackDiagramSceneProps) {
  const layout = useMemo(() => computeLayout(layers), [layers]);
  const nodeCount = layout.nodes.length;
  const onIntroCompleteRef = useRef(onIntroComplete);

  const [nodeReveals, setNodeReveals] = useState<number[]>(() =>
    Array.from({ length: nodeCount }, () => 0),
  );
  const [edgeReveal, setEdgeReveal] = useState(0);

  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);

  useEffect(() => {
    let cancelled = false;
    const animations: Array<{ pause: () => void }> = [];
    let startFrame = 0;

    const finish = () => {
      if (cancelled) return;
      setNodeReveals(Array.from({ length: nodeCount }, () => 1));
      setEdgeReveal(1);
      onIntroCompleteRef.current?.();
    };

    startFrame = requestAnimationFrame(() => {
      if (cancelled) return;

      if (prefersReducedMotion() || nodeCount === 0) {
        finish();
        return;
      }

      setNodeReveals(Array.from({ length: nodeCount }, () => 0));
      setEdgeReveal(0);

      const totalDuration =
        NODE_STAGGER_MS * Math.max(nodeCount - 1, 0) + NODE_DURATION_MS;
      const nodeProgress = { t: 0 };

      const nodeAnimation = animate(nodeProgress, {
        t: totalDuration,
        duration: totalDuration,
        ease: "linear",
        onUpdate: () => {
          if (cancelled) return;
          setNodeReveals(
            Array.from({ length: nodeCount }, (_, index) => {
              const start = index * NODE_STAGGER_MS;
              return Math.min(
                1,
                Math.max(0, (nodeProgress.t - start) / NODE_DURATION_MS),
              );
            }),
          );
        },
        onComplete: () => {
          if (cancelled) return;

          const edgeProgress = { value: 0 };
          const edgeAnimation = animate(edgeProgress, {
            value: 1,
            duration: EDGE_DURATION_MS,
            ease: "outQuad",
            onUpdate: () => {
              if (!cancelled) setEdgeReveal(edgeProgress.value);
            },
            onComplete: () => {
              if (!cancelled) onIntroCompleteRef.current?.();
            },
          });

          animations.push(edgeAnimation);
        },
      });

      animations.push(nodeAnimation);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(startFrame);
      for (const animation of animations) {
        animation.pause();
      }
    };
  }, [layers, nodeCount]);

  return (
    <div
      style={{
        height: 480,
        width: "100%",
        overflow: "hidden",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#07080f",
      }}
    >
      <Scene
        layers={layers}
        nodeReveals={nodeReveals}
        edgeReveal={edgeReveal}
      />
    </div>
  );
}
