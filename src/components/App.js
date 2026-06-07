import { aboutSection } from './about.js';
import { contactSection } from './contact.js';
import { experienceSection } from './experience.js';
import { hero } from './hero.js';
import { navigation } from './navigation.js';
import { projectsSection } from './projects.js';
import { skillsSection } from './skills.js';

function divider() {
  return '<div class="divider"></div>';
}

export function renderApp(root) {
  root.innerHTML = `
    <div id="cursor"></div>
    <div id="cursor-ring"></div>
    <canvas id="bg-canvas"></canvas>
    ${navigation()}
    ${hero()}
    ${divider()}
    ${skillsSection()}
    ${divider()}
    ${experienceSection()}
    ${divider()}
    ${projectsSection()}
    ${divider()}
    ${aboutSection()}
    ${divider()}
    ${contactSection()}
    <footer>
      <span style="color: var(--accent)">EK</span> · Ehsan Khodaveysi · Front-End Developer · Hamedan, Iran · 2026
    </footer>
  `;
}
