import { skills } from '../data/portfolio.js';
import { sectionHeader } from './sectionHeader.js';

function skillCard(skill) {
  return `
    <div class="skill-card">
      <div class="skill-cat">${skill.category}</div>
      <div class="skill-title">${skill.title}</div>
      <div class="skill-tags">
        ${skill.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `;
}

export function skillsSection() {
  return `
    <section id="skills">
      <div class="section-wrap">
        ${sectionHeader('Technical Arsenal', 'Skills & Tools')}
        <div class="skills-grid">
          ${skills.map(skillCard).join('')}
        </div>
      </div>
    </section>
  `;
}
