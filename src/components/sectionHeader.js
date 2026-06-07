export function sectionHeader(label, title, options = {}) {
  const centered = options.centered ? ' style="justify-content: center"' : '';

  return `
    <div class="section-label"${centered}>${label}</div>
    <h2 class="section-title">${title}</h2>
  `;
}
