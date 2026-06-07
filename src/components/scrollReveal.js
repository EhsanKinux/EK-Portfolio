export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), index * 120);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll('.exp-item, .project-card:not(.add-card)').forEach((element) => {
    observer.observe(element);
  });
}
