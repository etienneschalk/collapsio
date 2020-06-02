export class TerrainMap {
  constructor(nCells, tileSize) {
    this.area = new Array(nCells);
    this.nCells = nCells;
    this.tileSize = tileSize;

    // Shift to the center origin;
    this.offsetX = 0;
    this.offsetY = 0;

    for (let row = 0; row < nCells; ++row) {
      this.area[row] = new Array(this.nCells);
    }

    this.cachedDrawnMap = undefined;
  }

  loadMapFromFile(terrainFileContent) {
    terrainFileContent.forEach((row, rowIndex) => {
      this.area[rowIndex] = new Array(this.nCells);
      // Cell contains only the terrain type Id, for now.
      row.forEach((cellTerrainId, colIndex) => {
        this.area[rowIndex][colIndex] = new TerrainCell(colIndex, rowIndex, cellTerrainId, this.nCells);
      });
    });
  }

  update() {
    // Do something
  }

  draw(ctx, images) {
    if (! this.cachedDrawnMap) {
      let canvas = document.createElement('canvas');
      canvas.width = this.nCells * this.tileSize;
      canvas.height = canvas.width;
      const ctxBg = canvas.getContext('2d');

      for (let row = 0; row < this.nCells; ++row) {
        for (let col = 0; col < this.nCells; ++col) {
          let image = images.filter(image => image.id === this.area[row][col].terrainId)[0].image;
          // console.log(image, this.area[row][col].terrainId)
          // this.area[row][col].draw(ctxBg, image, this.offsetX, this.offsetY);
          this.area[row][col].draw(ctxBg, image, this.tileSize, 0, 0);
        }
      }

      this.cachedDrawnMap = canvas;
      console.log("Cached drawn map generated");
    }
    ctx.drawImage(this.cachedDrawnMap, this.offsetX, this.offsetY);
  }
}


export class TerrainCell {
  constructor(x, y, terrainId, nCells) {
    this.x = x;
    this.y = y;
    this.terrainId = terrainId;
    this.nCells = nCells;
  }

  update() {
    // this.draw();
  }

  draw(ctx, image, tileSize, offsetX, offsetY) {
    ctx.drawImage(image, this.x * tileSize + offsetX, this.y * tileSize + offsetY)
  }
};