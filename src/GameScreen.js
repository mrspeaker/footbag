function GameScreen (canvas, controls, gameOver) {
  Container.call(this);

  this.gameOver = gameOver;

  var surface = new Surface(60, 40);
  var rover = new Rover(controls);
  rover.pos = {x: 30 * 32, y: 20 * 32};

  var bag = new Bag();
  bag.pos = {
    x: rover.pos.x,
    y: rover.pos.y
  };
  bag.groundLevel = 20 * 34;
  this.kicks = 0;

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

  var msgKicks = new Text('KICKS: -', font);
  msgKicks.pos = {x: 5, y: 15};
  this.add(msgKicks);
  this.gui.kicks = msgKicks;

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

      var midb = b.pos.x + b.w / 2;
      var midr = ax + aw / 2;

      var diff = midr - midb;
      this.bag.kick(diff * 0.5);
      b.onGround = false;
      this.kicks++;
	} else if (b.onGround) {
    this.kicks = 0;
  }

  // 0...4
  // [   ]
  // [  [] ]
  //    [  ]
  //    3..6

  // Confine player to the play area
  rover.pos.x = Math.max(rover.pos.x, 40);
  rover.pos.x = Math.min(rover.pos.x, surface.w - 40);
  rover.pos.y = Math.max(rover.pos.y, 40);
  rover.pos.y = Math.min(rover.pos.y, surface.h - 40);

  this.gui.kicks.text = this.kicks.toString();

};
