// import Game from './game.js';
import View from './view.js';
import './style.css';

document.body.appendChild(View.canvas);

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