import { BackgroundCanvas } from './background-canvas.js';
import './style.css';

(async function () {
  let backgroundCanvas = new BackgroundCanvas();
  let canvas = document.createElement('canvas');
  console.log("Awaiting init backgroundCanvas...");
  await backgroundCanvas.init(canvas)
  console.log("init backgroundCanvas finished.");

  document.body.appendChild(backgroundCanvas.canvas);

  let header = document.createElement('header');
  let footer = document.createElement('footer');
  let aside = document.createElement('aside');
  header.id = 'head';
  footer.id = 'foot';
  aside.id = 'sidepanel';
  // On top of canvas
  header.style.zIndex = 1;
  footer.style.zIndex = 1;
  aside.style.zIndex = 1;
  header.textContent = 'Header';
  footer.textContent = 'Footer';
  aside.textContent = "Side panel"
  document.body.appendChild(aside);
  document.body.appendChild(header);
  document.body.appendChild(footer);
})();

