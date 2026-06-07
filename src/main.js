import './style.css';
import { renderApp } from './components/App.js';
import { initCursor } from './components/cursor.js';
import { initScrollReveal } from './components/scrollReveal.js';

const root = document.getElementById('app');

renderApp(root);
initCursor();
initScrollReveal();

// document.querySelector('[data-action="add-project"]')?.addEventListener('click', () => {
//   alert('To add a project, update the projects array in src/data/portfolio.js.');
// });

const loadCanvasBackground = () => {
  import('./components/canvasBackground.js').then(({ initCanvasBackground }) => {
    initCanvasBackground();
  });
};

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(loadCanvasBackground);
} else {
  window.setTimeout(loadCanvasBackground, 0);
}
