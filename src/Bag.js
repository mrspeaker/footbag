function Bag (texture) {
  TileSprite.call(this, textures.moonlet, 32, 32);
  this.w = 20;
  this.h = 20;
  this.acc = {
    x: 0,
    y: -3
  };
}
Bag.prototype = Object.create(TileSprite.prototype);

Bag.prototype.update = function (dt, t) {
  var frames = [0,1,2,3,4,5,6,7].map(function (x) { return { x: x, y: 0 }; });
  this.frame = frames[Math.floor(t / 100) % frames.length];
  this.acc.y += 0.08;
  if (this.acc.y < 3) {
    this.pos.y += this.acc.y;
  }

};
