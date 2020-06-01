import './style.css';
import { config } from './config.js';
import {
	TerrainCell,
	TerrainMap,
} from './terrain.js';
import testTerrain from './data/testTerrain.json';
import { rgba } from './util.js';

import ImageTerrainWater from './images/water.png';
import ImageTerrainGrass from './images/grass.png';
import ImageTerrainSand from './images/sand.png';
import ImageTerrainDirt from './images/dirt.png';
import ImageTerrainStone from './images/stone.png';

var imageMapping = {
	'ImageTerrainWater': ImageTerrainWater,
	'ImageTerrainGrass': ImageTerrainGrass,
	'ImageTerrainSand': ImageTerrainSand,
	'ImageTerrainDirt': ImageTerrainDirt,
	'ImageTerrainStone': ImageTerrainStone,
};

var mouseX = 0;
var mouseY = 0;
var mousePressed = false;

function initCanvas() {
	let canvas = document.createElement('canvas');
	canvas.id = "surface";
	canvas.addEventListener('mousemove', event => {
		mouseX = event.clientX;
		mouseY = event.clientY;
	});
	document.body.appendChild(canvas);

	return canvas;
}

function initCanvasContext(canvas) {
	let ctx = canvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	return ctx;
}


async function loadImages(imagesLoadedCallback) {
	return new Promise((resolve, reject) => {
		let imageCount = 0;
		config.terrains.forEach(terrain => {
			const image = new Image();
			image.src = imageMapping[terrain.importName];
			console.log("Try to load img	" + image.src);
			image.onerror = reject;
			image.onload = () => {
				images.push({id: terrain.id, image: image});
				imageCount += 1;
				console.log("Image loaded: " + image);
				if (imageCount === config.terrains.length) {
					imagesLoadedCallback();
					resolve()
				}
			}
		});
	});
}

function drawCanvas(translate = false) {
	ctx.fillStyle = config.darkMode ? rgba(0, 0, 0, config.fadeOut) : rgba(255, 255, 255, config.fadeOut);
	ctx.fillRect(-canvas.width, -canvas.height, 2* canvas.width, 2* canvas.height);
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	if (translate)
		ctx.translate(Math.floor(ctx.canvas.width / 2), Math.floor(ctx.canvas.height / 2)); // now 0,0 is the center of the canvas.

	map.draw(ctx, images);
}


function animate(loop = true) {
	if (loop) {
	  window.requestAnimationFrame(animate);
	}
	drawCanvas(true);
}

async function init() {
	try {
		await loadImages(() => { console.log("[Info] All images loaded.") });
	} catch(err) {
		console.log("Error while loading images");
		return;
	}
	map.loadMapFromFile(testTerrain);
	animate(false);
}

const map = new TerrainMap();

init();

const canvas = initCanvas();
canvas.style.zIndex = 0;
const ctx = initCanvasContext(canvas);
const images = [];

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
	var width = document.body.offsetWidth;  // your code here
	var height = document.body.offsetHeight; // your code here
	ctx.canvas.width = width;
	ctx.canvas.height = height;
	drawCanvas(true);
}


initEventListeners(canvas, ctx);

function initEventListeners(canvas, ctx) {
  canvas.addEventListener('mousedown', e => {
    mousePressed = true;
	});

  canvas.addEventListener('mousemove', e => {
    if (mousePressed) {
      map.offsetX += e.movementX;
      map.offsetY += e.movementY;
			drawCanvas()
    }
  });
  canvas.addEventListener('mouseup', e => {
    mousePressed = false;
  });
}

export default {
	canvas,
}