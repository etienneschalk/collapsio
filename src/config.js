const config = {
  darkMode: false,
  fadeOut: 1,
  nCells: 32,
  terrains: [
    { id: 1, name: "water", importName: 'ImageTerrainWater', url: 'water.png' },
    { id: 2, name: "grass", importName: 'ImageTerrainGrass', url: 'grass.png' },
    { id: 3, name: "sand", importName: 'ImageTerrainSand', url: 'sand.png' },
    { id: 4, name: "dirt", importName: 'ImageTerrainDirt', url: 'dirt.png' },
    { id: 5, name: "stone", importName: 'ImageTerrainStone', url: 'stone.png' },
  ],
};

export { config };