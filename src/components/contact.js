import { contactLinks } from "../data/portfolio.js";
import { sectionHeader } from "./sectionHeader.js";

function contactLink(link) {
  const target = link.external ? ' target="_blank" rel="noreferrer"' : "";

  return `
    <a href="${link.href}" class="contact-link"${target}>
      <div class="contact-link-icon">${link.icon}</div>
      ${link.label}
    </a>
  `;
}

export function contactSection() {
  return `
    <section id="contact">
      <div class="section-wrap">
        ${sectionHeader("Let's Connect", "Get In Touch", { centered: true })}

        <p class="contact-sub glassy">
          Open to new opportunities, collaborations, and interesting projects.
        </p>

        <div class="contact-links glassy contact-glass-block">
          ${contactLinks.map(contactLink).join("")}
        </div>
      </div>
    </section>
  `;
}
