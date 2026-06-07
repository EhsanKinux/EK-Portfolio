import * as THREE from "three";

const palette = {
  cyan: 0x6efcff,
  mint: 0x4af0c0,
  violet: 0x8b5cf6,
  blue: 0x38bdf8,
  pink: 0xf472b6,
  amber: 0xfbbf24,
};

export function initCanvasBackground() {
  const canvas = document.getElementById("bg-canvas");

  if (!canvas) return;

  const hasWebGL = (() => {
    try {
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      return !!gl;
    } catch {
      return false;
    }
  })();

  if (hasWebGL) {
    initThree(canvas);
  } else {
    init2D(canvas);
  }
}

function initThree(canvas) {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let mouseX = 0;
  let mouseY = 0;
  let time = 0;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050816, 0.035);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 9);

  const root = new THREE.Group();
  scene.add(root);

  const nebula = createNebulaPlane();
  scene.add(nebula);

  const codeLayer = createCodeLayer();
  scene.add(codeLayer.mesh);

  const quantumField = createQuantumField();
  root.add(quantumField.points);
  root.add(quantumField.lines);

  const orbitSystem = createQubitOrbitSystem();
  root.add(orbitSystem);

  const circuit = createCircuitTraces();
  root.add(circuit);

  const stars = createStarField();
  scene.add(stars);

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function onMove(event) {
    mouseX = (event.clientX / width - 0.5) * 2;
    mouseY = (event.clientY / height - 0.5) * 2;
  }

  function animate() {
    const speed = reducedMotion ? 0.25 : 1;
    time += 0.008 * speed;

    root.rotation.y += (mouseX * 0.18 - root.rotation.y) * 0.055;
    root.rotation.x += (-mouseY * 0.12 - root.rotation.x) * 0.055;

    nebula.material.opacity = 0.28 + Math.sin(time * 0.6) * 0.035;
    nebula.rotation.z = Math.sin(time * 0.08) * 0.04;

    stars.rotation.y = time * 0.012;
    stars.rotation.x = Math.sin(time * 0.13) * 0.018;

    codeLayer.mesh.position.x = mouseX * -0.18;
    codeLayer.mesh.position.y = mouseY * 0.12;
    codeLayer.mesh.material.opacity = 0.055 + Math.sin(time * 0.9) * 0.015;

    animateQuantumField(quantumField, time);
    animateOrbitSystem(orbitSystem, time);
    animateCircuitTraces(circuit, time);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", onResize);
  document.addEventListener("mousemove", onMove);

  onResize();
  animate();
}

function createNebulaPlane() {
  const texture = makeNebulaTexture();
  const geometry = new THREE.PlaneGeometry(28, 18);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -7;
  return mesh;
}

function createCodeLayer() {
  const texture = makeCodeTexture();

  const geometry = new THREE.PlaneGeometry(22, 13);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.06,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, -5.8);

  return { mesh, texture };
}

function createQuantumField() {
  const nodeCount = 54;
  const basePositions = [];
  const currentPositions = [];
  const velocities = [];
  const pointPositions = new Float32Array(nodeCount * 3);
  const pointColors = new Float32Array(nodeCount * 3);

  const colorA = new THREE.Color(palette.cyan);
  const colorB = new THREE.Color(palette.violet);
  const colorC = new THREE.Color(palette.mint);

  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const radius = 1.8 + Math.random() * 4.3;
    const y = (Math.random() - 0.5) * 5.8;

    const x = Math.cos(theta) * radius + (Math.random() - 0.5) * 1.2;
    const z = Math.sin(theta) * radius * 0.72 + (Math.random() - 0.5) * 2.2;

    const base = new THREE.Vector3(x, y, z);
    basePositions.push(base);
    currentPositions.push(base.clone());

    velocities.push({
      phase: Math.random() * Math.PI * 2,
      amp: 0.06 + Math.random() * 0.16,
      speed: 0.4 + Math.random() * 0.7,
    });

    pointPositions[i * 3] = x;
    pointPositions[i * 3 + 1] = y;
    pointPositions[i * 3 + 2] = z;

    const mixed = colorA.clone().lerp(colorB, Math.random() * 0.7);
    if (Math.random() > 0.72) mixed.lerp(colorC, 0.55);

    pointColors[i * 3] = mixed.r;
    pointColors[i * 3 + 1] = mixed.g;
    pointColors[i * 3 + 2] = mixed.b;
  }

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
  pointsGeometry.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));

  const pointsMaterial = new THREE.PointsMaterial({
    map: makeParticleSprite(),
    size: 0.22,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(pointsGeometry, pointsMaterial);

  const pairs = [];
  const linePositions = [];

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const distance = basePositions[i].distanceTo(basePositions[j]);

      if (distance < 2.75) {
        pairs.push([i, j, distance]);
        linePositions.push(
          basePositions[i].x,
          basePositions[i].y,
          basePositions[i].z,
          basePositions[j].x,
          basePositions[j].y,
          basePositions[j].z,
        );
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    color: palette.cyan,
    transparent: true,
    opacity: 0.21,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);

  return {
    points,
    lines,
    pairs,
    basePositions,
    currentPositions,
    velocities,
  };
}

function animateQuantumField(field, time) {
  const pointArray = field.points.geometry.attributes.position.array;
  const lineArray = field.lines.geometry.attributes.position.array;

  field.basePositions.forEach((base, index) => {
    const v = field.velocities[index];

    const x = base.x + Math.sin(time * v.speed + v.phase) * v.amp;
    const y = base.y + Math.cos(time * v.speed * 0.82 + v.phase) * v.amp * 0.8;
    const z = base.z + Math.sin(time * v.speed * 1.2 + v.phase) * v.amp * 1.4;

    field.currentPositions[index].set(x, y, z);

    pointArray[index * 3] = x;
    pointArray[index * 3 + 1] = y;
    pointArray[index * 3 + 2] = z;
  });

  let pointer = 0;

  field.pairs.forEach(([a, b]) => {
    const start = field.currentPositions[a];
    const end = field.currentPositions[b];

    lineArray[pointer++] = start.x;
    lineArray[pointer++] = start.y;
    lineArray[pointer++] = start.z;
    lineArray[pointer++] = end.x;
    lineArray[pointer++] = end.y;
    lineArray[pointer++] = end.z;
  });

  field.points.geometry.attributes.position.needsUpdate = true;
  field.lines.geometry.attributes.position.needsUpdate = true;

  field.points.rotation.y = time * 0.035;
  field.lines.rotation.y = time * 0.035;
  field.points.material.size = 0.2 + Math.sin(time * 1.8) * 0.025;
  field.lines.material.opacity = 0.17 + Math.sin(time * 1.1) * 0.045;
}

function createQubitOrbitSystem() {
  const group = new THREE.Group();

  const configs = [
    { position: [-3.1, 1.4, 0.6], scale: 0.95, color: palette.violet },
    { position: [3.25, -1.2, -0.4], scale: 0.82, color: palette.mint },
    { position: [0.4, 0.1, 1.1], scale: 1.15, color: palette.blue },
  ];

  configs.forEach((config, index) => {
    const qubit = createQubit(config.color);
    qubit.position.set(...config.position);
    qubit.scale.setScalar(config.scale);
    qubit.userData.offset = index * 1.7;
    group.add(qubit);
  });

  return group;
}

function createQubit(color) {
  const group = new THREE.Group();

  const sphereGeometry = new THREE.SphereGeometry(0.72, 32, 16);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.11,
    blending: THREE.AdditiveBlending,
  });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  group.add(sphere);

  const ringMaterial = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.42,
    blending: THREE.AdditiveBlending,
  });

  const xy = createCircleLine(0.95, ringMaterial);
  const yz = createCircleLine(0.82, ringMaterial);
  const xz = createCircleLine(0.68, ringMaterial);

  xy.rotation.x = Math.PI / 2;
  yz.rotation.y = Math.PI / 2;
  xz.rotation.z = Math.PI / 6;

  group.add(xy, yz, xz);

  const stateVectorGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.55, 0.48, 0.54),
  ]);

  const stateVector = new THREE.Line(
    stateVectorGeometry,
    new THREE.LineBasicMaterial({
      color: palette.cyan,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    }),
  );

  group.add(stateVector);

  const coreGeometry = new THREE.SphereGeometry(0.055, 16, 16);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: palette.cyan,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
  });

  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  core.position.set(0.55, 0.48, 0.54);
  group.add(core);

  return group;
}

function animateOrbitSystem(system, time) {
  system.children.forEach((qubit) => {
    const offset = qubit.userData.offset || 0;

    qubit.rotation.x = Math.sin(time * 0.52 + offset) * 0.45;
    qubit.rotation.y = time * 0.55 + offset;
    qubit.rotation.z = Math.cos(time * 0.34 + offset) * 0.3;

    qubit.position.y += Math.sin(time * 0.9 + offset) * 0.0009;
  });
}

function createCircuitTraces() {
  const group = new THREE.Group();

  const points = [];
  const rows = 8;
  const cols = 11;
  const stepX = 0.85;
  const stepY = 0.54;
  const startX = -4.4;
  const startY = -2.1;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols - 1; x++) {
      if (Math.random() > 0.44) {
        const x1 = startX + x * stepX;
        const y1 = startY + y * stepY;
        const x2 = startX + (x + 1) * stepX;

        points.push(x1, y1, -2.5, x2, y1, -2.5);
      }
    }
  }

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows - 1; y++) {
      if (Math.random() > 0.66) {
        const x1 = startX + x * stepX;
        const y1 = startY + y * stepY;
        const y2 = startY + (y + 1) * stepY;

        points.push(x1, y1, -2.5, x1, y2, -2.5);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));

  const material = new THREE.LineBasicMaterial({
    color: palette.mint,
    transparent: true,
    opacity: 0.105,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const lines = new THREE.LineSegments(geometry, material);
  group.add(lines);

  const padGeometry = new THREE.SphereGeometry(0.025, 10, 10);
  const padMaterial = new THREE.MeshBasicMaterial({
    color: palette.cyan,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  });

  for (let i = 0; i < 36; i++) {
    const pad = new THREE.Mesh(padGeometry, padMaterial);
    pad.position.set(
      startX + Math.floor(Math.random() * cols) * stepX,
      startY + Math.floor(Math.random() * rows) * stepY,
      -2.5,
    );
    group.add(pad);
  }

  group.position.set(0.4, -0.25, -1.1);
  group.rotation.x = -0.18;
  group.rotation.z = -0.08;

  return group;
}

function animateCircuitTraces(circuit, time) {
  const lines = circuit.children[0];
  lines.material.opacity = 0.08 + Math.sin(time * 1.4) * 0.035;
  circuit.position.x = Math.sin(time * 0.24) * 0.08;
}

function createStarField() {
  const count = 420;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const cyan = new THREE.Color(palette.cyan);
  const violet = new THREE.Color(palette.violet);
  const mint = new THREE.Color(palette.mint);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 28;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = -3 - Math.random() * 12;

    const c = cyan.clone().lerp(violet, Math.random() * 0.7);
    if (Math.random() > 0.8) c.lerp(mint, 0.45);

    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

function createCircleLine(radius, material) {
  const points = [];
  const segments = 96;

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.Line(geometry, material);
}

function makeParticleSprite() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);

  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.16, "rgba(110,252,255,0.95)");
  gradient.addColorStop(0.42, "rgba(139,92,246,0.45)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  return texture;
}

function makeNebulaTexture() {
  const width = 1024;
  const height = 1024;
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  const bg = context.createRadialGradient(width * 0.52, height * 0.45, 0, width * 0.52, height * 0.45, width * 0.72);

  bg.addColorStop(0, "rgba(110,252,255,0.45)");
  bg.addColorStop(0.24, "rgba(139,92,246,0.28)");
  bg.addColorStop(0.52, "rgba(74,240,192,0.14)");
  bg.addColorStop(1, "rgba(0,0,0,0)");

  context.fillStyle = bg;
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < 90; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 35 + Math.random() * 140;

    const glow = context.createRadialGradient(x, y, 0, x, y, r);
    glow.addColorStop(0, `rgba(110,252,255,${0.06 + Math.random() * 0.07})`);
    glow.addColorStop(1, "rgba(0,0,0,0)");

    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  return texture;
}

function makeCodeTexture() {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  context.clearRect(0, 0, width, height);
  context.font = "24px monospace";
  context.textBaseline = "top";

  const fragments = [
    "|ψ⟩",
    "q[0]",
    "q[1]",
    "H",
    "CNOT",
    "1011",
    "superposition",
    "entangle()",
    "measure()",
    "</>",
    "const",
    "async",
    "{ code }",
    "matrix",
    "∑",
    "λ",
    "π",
  ];

  for (let row = 0; row < 18; row++) {
    const y = row * 30 + Math.random() * 8;

    for (let col = 0; col < 8; col++) {
      const x = col * 145 + Math.random() * 48;
      const text = fragments[Math.floor(Math.random() * fragments.length)];

      context.fillStyle = Math.random() > 0.55 ? "rgba(110,252,255,0.18)" : "rgba(139,92,246,0.16)";

      context.fillText(text, x, y);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  return texture;
}

// 2D fallback for devices/browsers without WebGL
function init2D(canvas) {
  const context = canvas.getContext("2d");
  const particles = createParticles(170);
  const nodes = create2DNodes(34);

  let width = 0;
  let height = 0;
  let mouseX = 0;
  let mouseY = 0;
  let time = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function animate() {
    time += 0.008;

    context.clearRect(0, 0, width, height);

    draw2DNebula(context, width, height, time);
    draw2DCode(context, width, height, mouseX, mouseY);
    drawParticles(context, particles, width, height, mouseX, mouseY, time);
    draw2DQuantumNetwork(context, nodes, width, height, mouseX, mouseY, time);
    draw2DRings(context, width, height, mouseX, mouseY, time);

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX / width - 0.5;
    mouseY = event.clientY / height - 0.5;
  });

  resize();
  animate();
}

function createParticles(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    z: Math.random() * 0.8 + 0.2,
    speed: Math.random() * 0.00036 + 0.0001,
    size: Math.random() * 1.8 + 0.4,
  }));
}

function create2DNodes(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    phase: Math.random() * Math.PI * 2,
    radius: Math.random() * 2 + 1,
  }));
}

function draw2DNebula(context, width, height, time) {
  const gradient = context.createRadialGradient(
    width * 0.55,
    height * 0.45,
    0,
    width * 0.55,
    height * 0.45,
    Math.max(width, height) * 0.65,
  );

  gradient.addColorStop(0, `rgba(110,252,255,${0.09 + Math.sin(time) * 0.015})`);
  gradient.addColorStop(0.35, "rgba(139,92,246,0.08)");
  gradient.addColorStop(0.72, "rgba(74,240,192,0.035)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}

function draw2DCode(context, width, height, mouseX, mouseY) {
  const fragments = ["|ψ⟩", "q[0]", "H", "CNOT", "1011", "async", "{}", "λ", "π"];

  context.save();
  context.font = "14px monospace";
  context.globalAlpha = 0.13;
  context.fillStyle = "rgba(110,252,255,0.55)";

  for (let i = 0; i < 42; i++) {
    const x = ((i * 173) % width) + mouseX * -20;
    const y = ((i * 89) % height) + mouseY * 16;
    context.fillText(fragments[i % fragments.length], x, y);
  }

  context.restore();
}

function drawParticles(context, particles, width, height, mouseX, mouseY, time) {
  context.save();

  particles.forEach((particle) => {
    const drift = time * particle.speed * 1000;
    const x = ((particle.x + drift) % 1) * width + mouseX * particle.z * 32;
    const y = particle.y * height + Math.sin(time + particle.x * 12) * 20 + mouseY * particle.z * 24;

    context.globalAlpha = 0.16 + particle.z * 0.32;
    context.fillStyle = particle.z > 0.62 ? "rgba(110,252,255,0.8)" : "rgba(139,92,246,0.62)";

    context.beginPath();
    context.arc(x, y, particle.size * particle.z, 0, Math.PI * 2);
    context.fill();
  });

  context.restore();
}

function draw2DQuantumNetwork(context, nodes, width, height, mouseX, mouseY, time) {
  const projected = nodes.map((node) => ({
    x: node.x * width + Math.sin(time * 0.8 + node.phase) * 18 + mouseX * 36,
    y: node.y * height + Math.cos(time * 0.65 + node.phase) * 16 + mouseY * 28,
    radius: node.radius,
  }));

  context.save();

  for (let i = 0; i < projected.length; i++) {
    for (let j = i + 1; j < projected.length; j++) {
      const a = projected[i];
      const b = projected[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 170) {
        context.globalAlpha = (1 - distance / 170) * 0.23;
        context.strokeStyle = "rgba(110,252,255,0.75)";
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  }

  projected.forEach((node) => {
    const glow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, 18);

    glow.addColorStop(0, "rgba(110,252,255,0.8)");
    glow.addColorStop(0.35, "rgba(139,92,246,0.32)");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    context.globalAlpha = 0.9;
    context.fillStyle = glow;
    context.beginPath();
    context.arc(node.x, node.y, 18, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "rgba(255,255,255,0.95)";
    context.beginPath();
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    context.fill();
  });

  context.restore();
}

function draw2DRings(context, width, height, mouseX, mouseY, time) {
  const rings = [
    { x: 0.28, y: 0.34, r: 78 },
    { x: 0.72, y: 0.62, r: 92 },
    { x: 0.5, y: 0.5, r: 118 },
  ];

  context.save();
  context.lineWidth = 1;

  rings.forEach((ring, index) => {
    const x = width * ring.x + mouseX * 42;
    const y = height * ring.y + mouseY * 32;

    context.save();
    context.translate(x, y);
    context.rotate(time * (0.35 + index * 0.08));
    context.scale(1, 0.38 + index * 0.08);

    context.globalAlpha = 0.18;
    context.strokeStyle = index % 2 === 0 ? "rgba(110,252,255,0.7)" : "rgba(139,92,246,0.65)";

    context.beginPath();
    context.arc(0, 0, ring.r, 0, Math.PI * 2);
    context.stroke();

    context.restore();
  });

  context.restore();
}
