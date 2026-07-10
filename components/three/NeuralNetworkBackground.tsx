"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type NeuralNetworkBackgroundProps = {
  onIntroComplete?: () => void;
};

export function NeuralNetworkBackground({
  onIntroComplete,
}: NeuralNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onIntroCompleteRef = useRef(onIntroComplete);

  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const NODE_COUNT = 210;
    const MAX_CONNECTIONS = 1200;
    const CENTRAL_CLUSTER_COUNT = 14;
    const REVEAL_FADE_BAND = 0.55;
    const COVERAGE_SCALE = 1.14;
    const LAYER_COUNT = 4;

    const INTRO_EXPAND_DURATION = 1.75;
    const FLASH_START = 1.75;
    const FLASH_DURATION = 0.45;
    const DONE_TIME = 2.45;

    const grayColor = new THREE.Color(0.62, 0.62, 0.62);
    const purple = new THREE.Color("#9b35ff");
    const cyan = new THREE.Color("#6fffe9");
    const green = new THREE.Color("#48ff9b");
    const white = new THREE.Color("#f4fff9");

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function smoothstep(edge0: number, edge1: number, x: number) {
      const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
      return t * t * (3 - 2 * t);
    }

    function randomBetween(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    function colorFromX(x: number) {
      const normalized = THREE.MathUtils.clamp((x + 3.8) / 7.6, 0, 1);

      if (normalized < 0.45) {
        return purple.clone().lerp(cyan, normalized / 0.45);
      }

      return cyan.clone().lerp(green, (normalized - 0.45) / 0.55);
    }

    function createCircleTexture(soft = false) {
      const size = 64;
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = size;
      textureCanvas.height = size;
      const ctx = textureCanvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not create circle texture context.");
      }

      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );

      if (soft) {
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.35, "rgba(255,255,255,0.85)");
        gradient.addColorStop(0.7, "rgba(255,255,255,0.25)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
      } else {
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.55, "rgba(255,255,255,0.92)");
        gradient.addColorStop(0.82, "rgba(255,255,255,0.2)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.needsUpdate = true;
      return texture;
    }

    function flashGradientColor(position: THREE.Vector3) {
      const t = THREE.MathUtils.clamp((position.x + 3.8) / 7.6, 0, 1);

      if (t < 0.25) {
        return white.clone().lerp(green, t / 0.25);
      }

      if (t < 0.5) {
        return green.clone().lerp(purple, (t - 0.25) / 0.25);
      }

      if (t < 0.75) {
        return purple.clone().lerp(cyan, (t - 0.5) / 0.25);
      }

      return cyan.clone().lerp(white, (t - 0.75) / 0.25);
    }

    function revealFromDistance(
      distance: number,
      elapsed: number,
      maxRadius: number,
    ) {
      const progress = easeOutCubic(
        THREE.MathUtils.clamp(elapsed / INTRO_EXPAND_DURATION, 0, 1),
      );
      const minFrontier = 0.38;
      const maxFrontier = maxRadius * 1.08;
      const frontier = THREE.MathUtils.lerp(minFrontier, maxFrontier, progress);
      return 1 - smoothstep(frontier - REVEAL_FADE_BAND, frontier, distance);
    }

    const layerTransforms = [
      {
        name: "east",
        rotation: new THREE.Euler(0, 0, 0),
        offset: new THREE.Vector3(0, 0, 0),
      },
      {
        name: "north",
        rotation: new THREE.Euler(0, 0, Math.PI * 0.5),
        offset: new THREE.Vector3(0, 0.05, 0.07),
      },
      {
        name: "southeast",
        rotation: new THREE.Euler(0.58, -0.46, -0.14),
        offset: new THREE.Vector3(0.13, -0.15, -0.2),
      },
      {
        name: "southwest",
        rotation: new THREE.Euler(0.58, 0.46, 0.14),
        offset: new THREE.Vector3(-0.13, -0.15, 0.2),
      },
    ];

    function transformPosition(
      position: THREE.Vector3,
      layer: (typeof layerTransforms)[number],
    ) {
      return position.clone().applyEuler(layer.rotation).add(layer.offset);
    }

    type NetworkNode = {
      position: THREE.Vector3;
      color: THREE.Color;
      distanceFromCenter: number;
      layerName: string;
    };

    function generateNodes() {
      const centers = [
        new THREE.Vector3(-3.35, -0.15, 0.1),
        new THREE.Vector3(-2.15, 0.45, -0.25),
        new THREE.Vector3(-0.65, -0.1, 0.25),
        new THREE.Vector3(0.75, 0.25, -0.15),
        new THREE.Vector3(2.15, -0.1, 0.2),
        new THREE.Vector3(3.25, 0.3, -0.2),
      ];

      const generated: Array<{
        position: THREE.Vector3;
        color: THREE.Color;
        distanceFromCenter: number;
      }> = [];

      for (let i = 0; i < CENTRAL_CLUSTER_COUNT; i++) {
        const angle = (i / CENTRAL_CLUSTER_COUNT) * Math.PI * 2;
        const radius = randomBetween(0, 0.3);

        const point = new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.85,
          randomBetween(-0.14, 0.14),
        );

        generated.push({
          position: point,
          color: colorFromX(point.x),
          distanceFromCenter: point.length(),
        });
      }

      for (let i = CENTRAL_CLUSTER_COUNT; i < NODE_COUNT; i++) {
        const center = centers[Math.floor(Math.random() * centers.length)];

        const spreadX = randomBetween(-0.85, 0.85);
        const spreadY = randomBetween(-0.75, 0.75);
        const spreadZ = randomBetween(-0.55, 0.55);

        const point = new THREE.Vector3(
          center.x + spreadX,
          center.y + spreadY,
          center.z + spreadZ,
        );

        point.y += Math.sin(point.x * 1.45) * 0.35;
        point.z += Math.cos(point.x * 0.9) * 0.2;

        generated.push({
          position: point,
          color: colorFromX(point.x),
          distanceFromCenter: point.length(),
        });
      }

      return generated;
    }

    function generateConnections(
      generatedNodes: Array<{
        position: THREE.Vector3;
      }>,
    ) {
      const connectionList: Array<[number, number]> = [];
      const connectionKeys = new Set<string>();

      for (let i = 0; i < generatedNodes.length; i++) {
        const nearby: Array<{ index: number; distance: number }> = [];

        for (let j = 0; j < generatedNodes.length; j++) {
          if (i === j) continue;

          const distance = generatedNodes[i].position.distanceTo(
            generatedNodes[j].position,
          );

          if (distance < 1.18) {
            nearby.push({ index: j, distance });
          }
        }

        nearby.sort((a, b) => a.distance - b.distance);

        const maxForNode = Math.floor(randomBetween(3, 7));

        for (let k = 0; k < Math.min(maxForNode, nearby.length); k++) {
          const a = Math.min(i, nearby[k].index);
          const b = Math.max(i, nearby[k].index);
          const key = `${a}-${b}`;

          if (!connectionKeys.has(key)) {
            connectionKeys.add(key);
            connectionList.push([a, b]);
          }

          if (connectionList.length >= MAX_CONNECTIONS) return connectionList;
        }
      }

      return connectionList;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    camera.position.set(0, 0, 8);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    const nodeCircleTexture = createCircleTexture(false);
    const pulseCircleTexture = createCircleTexture(true);

    const baseNodes = generateNodes();
    const baseConnections = generateConnections(baseNodes);

    const nodes: NetworkNode[] = [];
    const connections: Array<[number, number]> = [];
    const layerCentralIndices: number[][] = [];

    layerTransforms.forEach((layer) => {
      const nodeStart = nodes.length;
      const centralIndices: number[] = [];

      baseNodes.forEach((baseNode, index) => {
        const worldPosition = transformPosition(baseNode.position, layer);

        if (index < CENTRAL_CLUSTER_COUNT) {
          centralIndices.push(nodes.length);
        }

        nodes.push({
          position: worldPosition,
          color: colorFromX(worldPosition.x),
          distanceFromCenter: worldPosition.length(),
          layerName: layer.name,
        });
      });

      layerCentralIndices.push(centralIndices);

      baseConnections.forEach(([a, b]) => {
        connections.push([nodeStart + a, nodeStart + b]);
      });
    });

    const crossConnectionKeys = new Set<string>();

    function addCrossConnection(indexA: number, indexB: number) {
      const a = Math.min(indexA, indexB);
      const b = Math.max(indexA, indexB);
      const key = `${a}-${b}`;

      if (crossConnectionKeys.has(key)) return;

      crossConnectionKeys.add(key);
      connections.push([a, b]);
    }

    for (let layerA = 0; layerA < LAYER_COUNT; layerA++) {
      for (let layerB = layerA + 1; layerB < LAYER_COUNT; layerB++) {
        layerCentralIndices[layerA].forEach((indexA, centralIndex) => {
          const indexB =
            layerCentralIndices[layerB][
              centralIndex % CENTRAL_CLUSTER_COUNT
            ];
          const separation = nodes[indexA].position.distanceTo(
            nodes[indexB].position,
          );

          if (separation < 0.62) {
            addCrossConnection(indexA, indexB);
          }
        });

        const hubA = layerCentralIndices[layerA][0];
        const hubB = layerCentralIndices[layerB][0];

        if (nodes[hubA].position.distanceTo(nodes[hubB].position) < 0.75) {
          addCrossConnection(hubA, hubB);
        }
      }
    }

    const maxNetworkRadius = Math.max(
      ...nodes.map((node) => node.distanceFromCenter),
      0.01,
    );
    const connectionRevealDistances = connections.map(([a, b]) =>
      Math.max(nodes[a].distanceFromCenter, nodes[b].distanceFromCenter),
    );

    const nodePositions = new Float32Array(nodes.length * 3);
    const nodeColors = new Float32Array(nodes.length * 3);

    nodes.forEach((node, index) => {
      nodePositions[index * 3 + 0] = node.position.x;
      nodePositions[index * 3 + 1] = node.position.y;
      nodePositions[index * 3 + 2] = node.position.z;

      nodeColors[index * 3 + 0] = grayColor.r;
      nodeColors[index * 3 + 1] = grayColor.g;
      nodeColors[index * 3 + 2] = grayColor.b;
    });

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nodePositions, 3),
    );
    nodeGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(nodeColors, 3),
    );

    const STATIC_NODE_SIZE = 0.008;

    const nodeMaterial = new THREE.PointsMaterial({
      size: STATIC_NODE_SIZE,
      map: nodeCircleTexture,
      alphaMap: nodeCircleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const nodesMesh = new THREE.Points(nodeGeometry, nodeMaterial);
    networkGroup.add(nodesMesh);

    const linePositions = new Float32Array(connections.length * 2 * 3);
    const lineColors = new Float32Array(connections.length * 2 * 3);

    connections.forEach(([a, b], index) => {
      const start = nodes[a].position;
      const end = nodes[b].position;

      linePositions[index * 6 + 0] = start.x;
      linePositions[index * 6 + 1] = start.y;
      linePositions[index * 6 + 2] = start.z;
      linePositions[index * 6 + 3] = end.x;
      linePositions[index * 6 + 4] = end.y;
      linePositions[index * 6 + 5] = end.z;

      for (let k = 0; k < 2; k++) {
        lineColors[index * 6 + k * 3 + 0] = grayColor.r;
        lineColors[index * 6 + k * 3 + 1] = grayColor.g;
        lineColors[index * 6 + k * 3 + 2] = grayColor.b;
      }
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(lineMesh);

    type TravelerGroup = {
      points: THREE.Points;
      geometry: THREE.BufferGeometry;
      positions: Float32Array;
      material: THREE.PointsMaterial;
      travelers: Array<{
        edgeIndex: number;
        offset: number;
        speed: number;
      }>;
    };

    function createTravelParticles(
      color: string,
      count: number,
      speedOffset: number,
    ): TravelerGroup {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const travelers: TravelerGroup["travelers"] = [];

      for (let i = 0; i < count; i++) {
        travelers.push({
          edgeIndex: Math.floor(Math.random() * connections.length),
          offset: Math.random(),
          speed: randomBetween(0.06, 0.16) + speedOffset,
        });
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      const material = new THREE.PointsMaterial({
        color,
        size: 0.07,
        map: pulseCircleTexture,
        alphaMap: pulseCircleTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      networkGroup.add(points);

      return {
        points,
        geometry,
        positions,
        material,
        travelers,
      };
    }

    const purpleTravelers = createTravelParticles("#9b35ff", 34 * LAYER_COUNT, 0.01);
    const cyanTravelers = createTravelParticles("#6fffe9", 38 * LAYER_COUNT, 0.0);
    const greenTravelers = createTravelParticles("#48ff9b", 34 * LAYER_COUNT, 0.015);

    const travelerGroups = [purpleTravelers, cyanTravelers, greenTravelers];

    networkGroup.scale.setScalar(COVERAGE_SCALE);
    networkGroup.position.set(0, 0, 0);

    const startTime = performance.now();
    let doneShown = false;
    let animationFrameId = 0;

    function updateNodeAndLineColors(elapsed: number) {
      const colorReveal = smoothstep(
        FLASH_START,
        FLASH_START + FLASH_DURATION,
        elapsed,
      );
      const flashProgress =
        smoothstep(FLASH_START, FLASH_START + FLASH_DURATION * 0.5, elapsed) *
        (1 -
          smoothstep(
            FLASH_START + FLASH_DURATION * 0.5,
            FLASH_START + FLASH_DURATION,
            elapsed,
          ));

      const idleAmount = smoothstep(DONE_TIME, DONE_TIME + 1.5, elapsed);
      const introComplete = smoothstep(
        INTRO_EXPAND_DURATION - 0.05,
        INTRO_EXPAND_DURATION,
        elapsed,
      );

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nodeReveal = revealFromDistance(
          node.distanceFromCenter,
          elapsed,
          maxNetworkRadius,
        );

        const travelingWave =
          idleAmount *
          Math.max(
            0,
            Math.sin(
              elapsed * 1.6 - node.position.x * 1.35 + node.position.y * 0.65,
            ),
          );

        const targetColor = node.color.clone();
        const gradientFlash = flashGradientColor(node.position);

        const flashColor = targetColor
          .clone()
          .lerp(gradientFlash, 0.35 + flashProgress * 0.65)
          .multiplyScalar(1 + flashProgress * 2.8 + travelingWave * 0.65);

        const baseColor = grayColor.clone().lerp(flashColor, colorReveal);
        const finalColor = baseColor.multiplyScalar(0.12 + nodeReveal * 0.88);

        nodeColors[i * 3 + 0] = finalColor.r;
        nodeColors[i * 3 + 1] = finalColor.g;
        nodeColors[i * 3 + 2] = finalColor.b;
      }

      nodeGeometry.attributes.color.needsUpdate = true;

      connections.forEach(([a, b], index) => {
        const midpoint = nodes[a].position.clone().lerp(nodes[b].position, 0.5);
        const lineReveal = revealFromDistance(
          connectionRevealDistances[index],
          elapsed,
          maxNetworkRadius,
        );

        const wave =
          idleAmount *
          Math.max(0, Math.sin(elapsed * 1.4 - midpoint.x * 1.15));

        const baseColor = nodes[a].color.clone().lerp(nodes[b].color, 0.5);
        const gradientFlash = flashGradientColor(midpoint);
        const targetLineColor = baseColor
          .lerp(gradientFlash, flashProgress * 0.7 + wave * 0.25)
          .multiplyScalar(0.8 + flashProgress * 2.0 + wave * 0.65);

        const finalLineColor = grayColor
          .clone()
          .lerp(targetLineColor, colorReveal)
          .multiplyScalar(0.08 + lineReveal * 0.92);

        for (let k = 0; k < 2; k++) {
          lineColors[index * 6 + k * 3 + 0] = finalLineColor.r;
          lineColors[index * 6 + k * 3 + 1] = finalLineColor.g;
          lineColors[index * 6 + k * 3 + 2] = finalLineColor.b;
        }
      });

      lineGeometry.attributes.color.needsUpdate = true;

      nodeMaterial.opacity = 0.42 + introComplete * 0.14 + flashProgress * 0.46;
      lineMaterial.opacity =
        0.08 + introComplete * 0.1 + colorReveal * 0.16 + flashProgress * 0.24;
    }

    function updateTravelParticles(elapsed: number) {
      const visible = smoothstep(DONE_TIME, DONE_TIME + 1.0, elapsed);

      travelerGroups.forEach((group) => {
        group.material.opacity = 0.72 * visible;

        group.travelers.forEach((traveler, i) => {
          const [a, b] = connections[traveler.edgeIndex];
          const start = nodes[a].position;
          const end = nodes[b].position;

          const t = (traveler.offset + elapsed * traveler.speed) % 1;

          group.positions[i * 3 + 0] = THREE.MathUtils.lerp(start.x, end.x, t);
          group.positions[i * 3 + 1] = THREE.MathUtils.lerp(start.y, end.y, t);
          group.positions[i * 3 + 2] = THREE.MathUtils.lerp(start.z, end.z, t);
        });

        group.geometry.attributes.position.needsUpdate = true;
      });
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;

      const subtleBreath =
        1 +
        Math.sin(elapsed * 0.75) *
          0.012 *
          smoothstep(DONE_TIME, DONE_TIME + 1, elapsed);

      networkGroup.scale.setScalar(COVERAGE_SCALE * subtleBreath);

      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      const idle = smoothstep(DONE_TIME, DONE_TIME + 1.0, elapsed);

      networkGroup.rotation.y =
        mouse.x * 0.08 * idle + Math.sin(elapsed * 0.18) * 0.035 * idle;
      networkGroup.rotation.x =
        mouse.y * 0.05 * idle + Math.cos(elapsed * 0.16) * 0.02 * idle;
      networkGroup.rotation.z = Math.sin(elapsed * 0.12) * 0.018 * idle;

      updateNodeAndLineColors(elapsed);
      updateTravelParticles(elapsed);

      if (!doneShown && elapsed >= DONE_TIME) {
        doneShown = true;
        onIntroCompleteRef.current?.();
      }

      renderer.render(scene, camera);
    }

    function handleMouseMove(event: MouseEvent) {
      mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(event.clientY / window.innerHeight - 0.5) * 2;
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      nodeGeometry.dispose();
      lineGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      nodeCircleTexture.dispose();
      pulseCircleTexture.dispose();

      travelerGroups.forEach((group) => {
        group.geometry.dispose();
        group.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 block h-full w-full"
    />
  );
}
