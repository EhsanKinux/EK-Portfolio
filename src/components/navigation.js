import { navLinks } from '../data/portfolio.js';

export function navigation() {
  return `
    <nav>
      <div class="nav-logo">EK.DEV</div>
      <ul class="nav-links">
        ${navLinks.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join('')}
      </ul>
    </nav>
  `;
}
