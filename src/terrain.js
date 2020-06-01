import { config } from "./config.js";

function TerrainCell(x, y, terrainId) {
  this.x = x;
  this.y = y;
  this.terrainId = terrainId;

  this.update = () => {
    // this.draw();
  };

  this.draw = (ctx, image, offsetX, offsetY) => {
    ctx.drawImage(image, this.x * config.nCells + offsetX, this.y * config.nCells + offsetY)
    // ctx.beginPath();
    // ctx.strokeStyle = this.color;
    // ctx.lineWidth = this.radius;
    // ctx.lineCap = 'round';
    // ctx.moveTo(this.previousX, this.previousY);
    // ctx.lineTo(this.x, this.y);
    // ctx.stroke();
    // ctx.closePath();
  };
};

function TerrainMap() {
  this.area = new Array(config.nCells);

  // Shift to the center origin;
  this.offsetX = 0;
  this.offsetY = 0;

  for (let row = 0; row < config.nCells; ++row) {
    this.area[row] = new Array(config.nCells);
  }

  this.loadMapFromFile = (terrainFileContent) => {
    terrainFileContent.forEach((row, rowIndex) => {
      this.area[rowIndex] = new Array(config.nCells);
      // Cell contains only the terrain type Id, for now.
      row.forEach((cellTerrainId, colIndex) => {
        this.area[rowIndex][colIndex] = new TerrainCell(colIndex, rowIndex, cellTerrainId);
      });
    });
  };

  this.update = () => {
    // Do something
  };

  this.draw = (ctx, images) => {
    for (let row = 0; row < config.nCells; ++row) {
      for (let col = 0; col < config.nCells; ++col) {
        let image = images.filter(image => image.id === this.area[row][col].terrainId)[0].image;
        // console.log(image, this.area[row][col].terrainId)
        this.area[row][col].draw(ctx, image, this.offsetX, this.offsetY);
      }
    }
  };
}

export {
  TerrainCell,
  TerrainMap,
};