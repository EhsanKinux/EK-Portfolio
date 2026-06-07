import { experiences } from '../data/portfolio.js';
import { sectionHeader } from './sectionHeader.js';

function experienceItem(experience) {
  return `
    <div class="exp-item">
      <div class="exp-date">${experience.date}</div>
      <div class="exp-role">${experience.role}</div>
      <div class="exp-company">⬡ ${experience.company}</div>
      <ul class="exp-desc">
        ${experience.items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
}

export function experienceSection() {
  return `
    <section id="experience">
      <div class="section-wrap">
        ${sectionHeader('Work History', 'Experience')}
        <div class="exp-timeline">
          ${experiences.map(experienceItem).join('')}
        </div>
      </div>
    </section>
  `;
}
