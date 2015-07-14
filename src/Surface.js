var Surface = function (mapW, mapH) {

  var tileW = 32;
  var tileH = 32;

  this.w = mapW * tileW;
  this.h = mapH * tileH;

  // Make a random level
  var level = [];
  for (var i = 0; i < mapW * mapH; i++) {
    level.push(Math.random() * 4 | 0);
  }

  var tileIndexes = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 4, y: 1 }
  ];

  TileMap.call(this, {
    texture: textures.tiles,
    tiles: level.map(function (i) { return tileIndexes[i]; }),
    w: mapW,
    h: mapH,
    tileW: tileW,
    tileH: tileH
  });

};
Surface.prototype = Object.create(TileMap.prototype);

Surface.prototype.getRandomPos = function () {
  return {
    x: ((Math.random() * (this.map.w - 2)) + 1) * this.map.tileW,
    y: (Math.random() * (this.map.h - 2)) * this.map.tileH // not -1 cause bad collision detection.
  };
};

Surface.prototype.checkIfNewGround = function (pos, newGroundCallback) {
  var tilePos = this.worldToTilePosition(pos);
  var tile = this.tileAtPosition(tilePos);

  if (!(tile.frame.x === 0 && tile.frame.y === 0)) {
    tile.frame = {x: 0, y: 0}; // Reset the tile to flat
    if (newGroundCallback) {
      newGroundCallback();
    }
  }
};
