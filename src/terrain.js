export class TerrainMap {
  constructor(nCells) {
    this.area = new Array(nCells);
    this.nCells = nCells;

    // Shift to the center origin;
    this.offsetX = 0;
    this.offsetY = 0;

    for (let row = 0; row < nCells; ++row) {
      this.area[row] = new Array(this.nCells);
    }
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
    for (let row = 0; row < this.nCells; ++row) {
      for (let col = 0; col < this.nCells; ++col) {
        let image = images.filter(image => image.id === this.area[row][col].terrainId)[0].image;
        // console.log(image, this.area[row][col].terrainId)
        this.area[row][col].draw(ctx, image, this.offsetX, this.offsetY);
      }
    }
  }
}


export class TerrainCell {
  constructor(x, y, terrainId, nCells) {
    this.x = x;
    this.y = y;
    this.terrainId = terrainId;
    this.nCells = nCells
  }

  update() {
    // this.draw();
  }

  draw(ctx, image, offsetX, offsetY) {
    ctx.drawImage(image, this.x * this.nCells + offsetX, this.y * this.nCells + offsetY)
  }
};