function TitleScreen (canvas, controls, onStart) {
  Container.call(this);

  this.onStart = onStart;
  this.controls = controls;
  controls.reset(); // NOTE: Need to add/explain "reset"

  var drawText = function(msg, pos, size) {
    var font = (size || 12) + 'pt monospace';
    var back = new Text(msg, {font: font, fill: '#000'});
    back.pos = {x: pos.x + 2, y: pos.y + 2};
    this.add(back);

    var fore = new Text(msg, {font: font, fill: '#fff'});
    fore.pos = pos;
    this.add(fore);
  }.bind(this);

  drawText('Test', {x: 150, y: 70}, 22);

}

TitleScreen.prototype = Object.create(Container.prototype);

TitleScreen.prototype.update = function (dt, t) {
  Container.prototype.update.call(this, dt, t);

  var actionPressed = this.controls.action();
  if (actionPressed) {
    this.onStart.apply(this);
  }
};
