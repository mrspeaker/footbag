function Bag (texture) {
  TileSprite.call(this, textures.moonlet, 32, 32);
  this.w = 20;
  this.h = 20;
  this.acc = {
    x: 0,
    y: 5
  };
  this.vel = {x: 0, y: 0};
}
Bag.prototype = Object.create(TileSprite.prototype);

Bag.prototype.kick = function (diff) {
  this.acc.x = this.onGround ? 0 : diff;
  this.acc.y = 23;
};

Bag.prototype.update = function (dt, t) {
  var frames = [0,1,2,3,4,5,6,7].map(function (x) { return { x: x, y: 0 }; });
  this.frame = frames[Math.floor(t / 100) % frames.length];
  var friction = 0.95;
  this.acc.x *= friction;
  this.acc.y *= friction;

  if (this.pos.y <= this.groundLevel) {
    this.acc.y -= 1;
    this.onGround = false;
    this.pos.y -= 8
  } else {
    this.onGround = true;
    //this.acc.y = 0;
    this.pos.y = this.groundLevel;
  }

  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;

    this.pos.y -= this.acc.y;
    this.pos.x -= this.acc.x;


};
