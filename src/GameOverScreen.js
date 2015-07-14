function GameOverScreen (canvas, controls, result, onStart) {
  Container.call(this);

  this.onStart = onStart;
  this.controls = controls;
  controls.reset();

  var drawText = function(msg, pos, size) {
    var font = (size || 12) + 'pt monospace';
    var back = new Text(msg, {font: font, fill: '#000'});
    back.pos = {x: pos.x + 2, y: pos.y + 2};
    this.add(back);

    var fore = new Text(msg, {font: font, fill: '#fff'});
    fore.pos = pos;
    this.add(fore);
  }.bind(this);

  drawText('done ' + result, {x: 80, y: 150});


}
GameOverScreen.prototype = Object.create(Container.prototype);

GameOverScreen.prototype.update = function (t, dt) {
  Container.prototype.update.call(this, t, dt);

  var actionPressed = this.controls.action();
  if (actionPressed) {
    this.onStart.apply(this);
  }
};
