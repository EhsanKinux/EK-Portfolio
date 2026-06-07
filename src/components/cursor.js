export function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');

  if (!cursor || !ring) {
    return;
  }

  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;

  document.addEventListener('mousemove', (event) => {
    mx = event.clientX;
    my = event.clientY;
    cursor.style.left = `${mx}px`;
    cursor.style.top = `${my}px`;
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
    requestAnimationFrame(animateRing);
  }

  animateRing();

  document.querySelectorAll('a, button, .project-card.add-card').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      ring.style.width = '60px';
      ring.style.height = '60px';
    });

    element.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      ring.style.width = '40px';
      ring.style.height = '40px';
    });
  });
}
