'use strict';

function Rover (controls) {
  //Sprite.call(this, textures.rover);
  Container.call(this);


  var man = new Sprite(textures.rover);
  man.pos = {x: 0, y: 0};
  man.pivot = { x: 36, y: 60 };

  var left_foot = new Rect('rgba(0,0,0,0.5)', 20, 15);
  left_foot.pos = {x: -20, y: 55 };

  this.add(man);
  this.add(left_foot);

  this.controls = controls;
  this.man = man;
  this.left_foot = left_foot;
}
Rover.prototype = Object.create(Container.prototype);

Rover.prototype.update = function (dt, t) {
  var controlsX = this.controls.x();
  var controlsY = this.controls.y();

  var speed = 0.1;
  var xo = controlsX * dt * speed;
  var yo = controlsY * dt * speed;

  this.pos.x += xo;
  this.pos.y += yo;
};
