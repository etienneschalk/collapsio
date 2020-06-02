import { rgba } from './util.js';

const nCells = 32;
const tileSize = 4;
let mousePressed = false;
let xOrigin = 0;
let yOrigin = 0;

let colorsAreaPrerendered;

function init() {
  const canvas = document.createElement('canvas');
  canvas.id = "surface";
  // document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  colorsAreaPrerendered = preRenderColors()
  draw(ctx);
  initEventListeners(canvas, ctx);

  return canvas
}

function draw(ctx, translateX = 0, translateY = 0) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.clearRect(0, 0, 32 * 64, 32 * 64); // il y a des carres qui depassent

  // ctx.save()
  ctx.translate(translateX, translateY);
  ctx.drawImage(colorsAreaPrerendered, 0, 0);
  // ctx.translate(-translateX, -translateY);
  // ctx.restore()

  ctx.font = '32px serif';
  ctx.fillText("xOrigin " + xOrigin + " ; yOrigin " + yOrigin, 32, 32);
}

function initEventListeners(canvas, ctx) {
  canvas.addEventListener('mousedown', e => {
    mousePressed = true;
    // console.log(e)
    // console.log(e.clientX)
    // console.log(e.clientY)
  });
  canvas.addEventListener('mousemove', e => {
    if (mousePressed) {
      // console.log(e)
      // console.log(e.movementX)
      // console.log(e.movementY)
      xOrigin += e.movementX;
      yOrigin += e.movementY;
      draw(ctx, e.movementX, e.movementY)
    }
  });
  canvas.addEventListener('mouseup', e => {
    mousePressed = false;
    // console.log(e)
    // console.log(e.clientX)
    // console.log(e.clientY)
  });
}

function preRenderColors() {
  const canvas = document.createElement('canvas');
  canvas.width = nCells * tileSize;
  canvas.height = canvas.width;
  const ctx = canvas.getContext('2d');

  for (let x = 0; x < nCells; ++x) {
    for (let y = 0; y < nCells; ++y) {
      ctx.fillStyle = rgba(x * 8, y * 8, 255, 1);
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      // break;
    }
    // break;
  }

  return canvas;
}

export default {
  init,
}