function GameScreen (canvas, controls, gameOver) {
  Container.call(this);

  this.gameOver = gameOver;

  var surface = new Surface(60, 40);
  var rover = new Rover(controls);
  rover.pos = surface.getRandomPos();

  var bag = new Bag();
  bag.pos = {
    x: rover.pos.x,
    y: rover.pos.y
  };

  var camera = new Camera({
    focusObject: rover,
    viewport: {w: canvas.width, h: canvas.height},
    worldSize: {w: surface.w, h: surface.h},
    moveSpeed: 0.008
  });

  // Add it all to the game
  this.add(camera);
  camera.add(surface);
  camera.add(rover);
  camera.add(bag);

  // The score
  this.gui = {};
  this.add(new Rect('rgba(0, 0, 0, 0.5)', canvas.width, 20));
  var font = {font: '12pt monospace', fill: '#fff'};

  var msgScience = new Text('SCIENCE: -', font);
  msgScience.pos = {x: 5, y: 15};
  this.add(msgScience);
  this.gui.science = msgScience;

  // Keep references to things we need in "update"
  this.surface = surface;
  this.camera = camera;
  this.rover = rover;
  this.bag = bag;
}
GameScreen.prototype = Object.create(Container.prototype);

GameScreen.prototype.update = function (dt, t) {
  Container.prototype.update.call(this, dt, t);

  var rover = this.rover;
  var gui = this.gui;
  var surface = this.surface;

  var a = this.rover;
  var ax = a.pos.x + a.left_foot.pos.x;
  var ay = a.pos.y + a.left_foot.pos.y;
  var aw = a.left_foot.w;
  var ah = a.left_foot.h;

  var b = this.bag;

  if (ax + aw >= b.pos.x &&
		ax <= b.pos.x + b.w &&
		ay + ah >= b.pos.y &&
		ay <= b.pos.y + b.h) {
      this.bag.acc.y = -3;
	}


  // Confine player to the play area
  rover.pos.x = Math.max(rover.pos.x, 40);
  rover.pos.x = Math.min(rover.pos.x, surface.w - 40);
  rover.pos.y = Math.max(rover.pos.y, 40);
  rover.pos.y = Math.min(rover.pos.y, surface.h - 40);

};
