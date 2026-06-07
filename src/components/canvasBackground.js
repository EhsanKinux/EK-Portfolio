const palette = {
  accent: 'rgba(74, 240, 192, 0.55)',
  accentSoft: 'rgba(74, 240, 192, 0.12)',
  violet: 'rgba(123, 92, 247, 0.16)',
  orange: 'rgba(240, 114, 74, 0.16)',
};

export function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');

  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');
  const particles = createParticles(180);
  const shapes = [
    createWireShape(3.2, 0.35, 0.38, palette.violet),
    createWireShape(2.1, -0.32, -0.28, palette.accentSoft),
    createRingShape(1.8, -0.18, 0.34, palette.orange),
  ];

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
    drawParticles(context, particles, width, height, mouseX, mouseY, time);
    shapes.forEach((shape, index) => drawWireShape(context, shape, width, height, mouseX, mouseY, time + index));
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', (event) => {
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
    speed: Math.random() * 0.00035 + 0.00012,
    size: Math.random() * 1.8 + 0.4,
  }));
}

function drawParticles(context, particles, width, height, mouseX, mouseY, time) {
  context.save();
  context.fillStyle = palette.accent;

  particles.forEach((particle) => {
    const drift = time * particle.speed * 1000;
    const x = ((particle.x + drift) % 1) * width + mouseX * particle.z * 28;
    const y = particle.y * height + Math.sin(time + particle.x * 12) * 18 + mouseY * particle.z * 22;

    context.globalAlpha = 0.18 + particle.z * 0.36;
    context.beginPath();
    context.arc(x, y, particle.size * particle.z, 0, Math.PI * 2);
    context.fill();
  });

  context.restore();
}

function createWireShape(size, xOffset, yOffset, stroke) {
  const vertices = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  return { type: 'poly', vertices, edges, size, xOffset, yOffset, stroke };
}

function createRingShape(size, xOffset, yOffset, stroke) {
  return { type: 'ring', size, xOffset, yOffset, stroke };
}

function drawWireShape(context, shape, width, height, mouseX, mouseY, time) {
  const centerX = width * (0.5 + shape.xOffset) + mouseX * 70;
  const centerY = height * (0.5 + shape.yOffset) + mouseY * 50;
  const scale = Math.min(width, height) * 0.11 * shape.size;

  context.save();
  context.strokeStyle = shape.stroke;
  context.lineWidth = 1;

  if (shape.type === 'ring') {
    context.translate(centerX, centerY);
    context.rotate(time * 0.35);
    context.scale(1, 0.42);
    context.beginPath();
    context.arc(0, 0, scale * 0.55, 0, Math.PI * 2);
    context.stroke();
    context.restore();
    return;
  }

  const projected = shape.vertices.map((vertex) => projectVertex(vertex, scale, centerX, centerY, time));

  shape.edges.forEach(([from, to]) => {
    context.beginPath();
    context.moveTo(projected[from].x, projected[from].y);
    context.lineTo(projected[to].x, projected[to].y);
    context.stroke();
  });

  context.restore();
}

function projectVertex([x, y, z], scale, centerX, centerY, time) {
  const sinY = Math.sin(time * 0.34);
  const cosY = Math.cos(time * 0.34);
  const sinX = Math.sin(time * 0.22);
  const cosX = Math.cos(time * 0.22);

  const rotatedX = x * cosY - z * sinY;
  const rotatedZ = x * sinY + z * cosY;
  const rotatedY = y * cosX - rotatedZ * sinX;
  const depth = y * sinX + rotatedZ * cosX + 4;
  const perspective = 1 / depth;

  return {
    x: centerX + rotatedX * scale * perspective,
    y: centerY + rotatedY * scale * perspective,
  };
}
