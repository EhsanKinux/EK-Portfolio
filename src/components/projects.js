import { projects } from '../data/portfolio.js';
import { sectionHeader } from './sectionHeader.js';

function projectCard(project) {
  return `
    <div class="project-card">
      <div class="project-num">// ${project.number}</div>
      <div class="project-title">${project.title}</div>
      <p class="project-desc">${project.description}</p>
      <div class="project-stack">
        ${project.stack.map((tag) => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <a href="${project.href}" target="_blank" rel="noreferrer" class="project-link">View on GitHub →</a>
    </div>
  `;
}

export function projectsSection() {
  return `
    <section id="projects">
      <div class="section-wrap">
        ${sectionHeader('Selected Work', 'Projects')}
        <div class="projects-grid">
          ${projects.map(projectCard).join('')}
        </div>
      </div>
    </section>
  `;
}

// export function projectsSection() {
//   return `
//     <section id="projects">
//       <div class="section-wrap">
//         ${sectionHeader('Selected Work', 'Projects')}
//         <div class="projects-grid">
//           ${projects.map(projectCard).join('')}
//           <button type="button" class="project-card add-card" data-action="add-project">
//             <div class="add-icon">+</div>
//             <div class="add-label">Add a Project</div>
//           </button>
//         </div>
//       </div>
//     </section>
//   `;
// }