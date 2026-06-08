import { education, languages } from "../data/portfolio.js";
import { sectionHeader } from "./sectionHeader.js";

function languageChip(language) {
  return `
    <div class="lang-chip">
      ${language.name}
      <div class="lang-level" style="width: ${language.level}%"></div>
    </div>
  `;
}

function educationCard(item) {
  return `
    <div class="edu-card">
      <div class="edu-degree">${item.degree}</div>
      <div class="edu-school">${item.school}</div>
      <div class="edu-info">${item.info}</div>
    </div>
  `;
}

export function aboutSection() {
  return `
    <section id="about">
      <div class="section-wrap">
        ${sectionHeader("Background", "About Me")}
        <div class="about-grid">
          <div>
            <div class="about-text">
              <p class="glassy">
                I'm a <span class="highlight">front-end developer</span> based in Hamedan, Iran, focused on crafting
                web and mobile experiences that are fast, accessible, and visually compelling.
              </p>
              <p class="glassy">
                My work spans from <span class="highlight">interactive 3D product viewers</span> built with Three.js,
                to responsive dashboards and cross-platform mobile UIs in React Native. I care deeply about component
                architecture, performance, and clean, testable code.
              </p>
              <p class="glassy">
                Outside of client work, I'm fascinated by the intersection of
                <span class="highlight">UI/UX design, web performance, quantum computing,</span> and emerging 3D web
                experiences. Always learning, always building.
              </p>
            </div>
            <h3 class="about-subtitle">Languages</h3>
            <div class="lang-chips">
              ${languages.map(languageChip).join("")}
            </div>
          </div>

          <div>
            <h3 class="about-subtitle">Education</h3>
            ${education.map(educationCard).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}
