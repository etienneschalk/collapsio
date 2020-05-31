import _ from 'lodash';
// import Print from './print.js';
import Game from './game.js';
import './style.css';

function component() {
  const element = Game.init();
  return element;
  // const element = document.createElement('div');
  //   const btn = document.createElement('button');

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = Print.bind(null, 'Hello webpack!');;

  // element.appendChild(btn);

  // return element;
}

document.body.appendChild(component());