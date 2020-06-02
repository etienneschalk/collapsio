import './style.css';
import { config } from './config.js';
import {
	TerrainMap,
} from './terrain.js';
import testTerrain from './data/testTerrain.json';
import { rgba } from './util.js';

import ImageTerrainWater from './images/water.png';
import ImageTerrainGrass from './images/grass.png';
import ImageTerrainSand from './images/sand.png';
import ImageTerrainDirt from './images/dirt.png';
import ImageTerrainStone from './images/stone.png';


export class BackgroundCanvas {
	constructor() {
		this.debug = config.debug;
		this.logs = [];

		this.mouseX = 0;
		this.mouseY = 0;
		this.mousePressed = false;

		this.images = [];
		this.imageMapping = {
			'ImageTerrainWater': ImageTerrainWater,
			'ImageTerrainGrass': ImageTerrainGrass,
			'ImageTerrainSand': ImageTerrainSand,
			'ImageTerrainDirt': ImageTerrainDirt,
			'ImageTerrainStone': ImageTerrainStone,
		};
	}

	log(logLevel, logMessage, cause) {
		this.logs.push({ logLevel, logMessage, cause});
		let buildedLogString = "[" + logLevel + "] ";
		buildedLogString += "<" + this.constructor.name + "> ";
		buildedLogString += logMessage;
		if (cause) {
			buildedLogString += cause;
		}
		if (this.debug) {
			if (logLevel === "error") {
				console.error(buildedLogString);
			}
			else if (logLevel === "warn")
				console.warn(buildedLogString);
			else
				console.log(buildedLogString);
		}
	}

	async init(canvas) {
		this.initCanvas(canvas);
		this.initCanvasContext();

		this.map = new TerrainMap(config.nCells);

		try {
			this.log("info", "Awaiting loadImages()...");
			await this.loadImages(() => { this.log("info", "All images loaded.") });
			this.log("info", "loadImages() finished.");
		} catch (err) {
			this.log("error", "Error while loading images", err);
			return;
		}

		this.map.loadMapFromFile(testTerrain);
		this.animate(false);


		window.addEventListener('resize', () => this.resizeCanvas(this), false);
		this.initEventListeners();
	}

	initCanvas(canvas) {
		canvas.id = "surface";
		canvas.addEventListener('mousemove', event => {
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;
		});
		canvas.style.zIndex = 0;

		this.canvas = canvas;
	}

	initCanvasContext() {
		let ctx = this.canvas.getContext('2d');
		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;

		this.ctx = ctx;
	}

	async loadImages(imagesLoadedCallback) {
		return new Promise((resolve, reject) => {
			let imageCount = 0;
			config.terrains.forEach(terrain => {
				const image = new Image();
				image.src = this.imageMapping[terrain.importName];
				this.log("info", "Try to load img	" + image.src);
				image.onerror = reject;
				image.onload = () => {
					this.images.push({ id: terrain.id, image: image });
					imageCount += 1;
					this.log("info", "Image loaded: " + image);
					if (imageCount === config.terrains.length) {
						imagesLoadedCallback();
						resolve()
					}
				}
			});
		});
	}

	drawCanvas(translate = false) {
		this.ctx.fillStyle = config.darkMode ? rgba(0, 0, 0, config.fadeOut) : rgba(255, 255, 255, config.fadeOut);
		this.ctx.fillRect(-this.canvas.width, -this.canvas.height, 2 * this.canvas.width, 2 * this.canvas.height);
		// this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		if (translate)
			this.ctx.translate(Math.floor(this.ctx.canvas.width / 2), Math.floor(this.ctx.canvas.height / 2)); // now 0,0 is the center of the canvas.

		this.map.draw(this.ctx, this.images);
	}

	animate(loop = true) {
		if (loop) {
			window.requestAnimationFrame(animate);
		}
		this.drawCanvas(true);
	}

	initEventListeners() {
		this.canvas.addEventListener('mousedown', e => {
		this.mousePressed = true;
		});

		this.canvas.addEventListener('mousemove', e => {
			if (this.mousePressed) {
				this.map.offsetX += e.movementX;
				this.map.offsetY += e.movementY;
				this.drawCanvas()
			}
		});
		this.canvas.addEventListener('mouseup', e => {
			this.mousePressed = false;
		});
	}

	resizeCanvas(thisBackgroundCanvas) {
		var width = document.body.offsetWidth;  // your code here
		var height = document.body.offsetHeight; // your code here
		thisBackgroundCanvas.ctx.canvas.width = width;
		thisBackgroundCanvas.ctx.canvas.height = height;
		thisBackgroundCanvas.drawCanvas(true);
	}
}
