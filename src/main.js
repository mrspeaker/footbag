// Game setup code
var w = 320;
var h = 568;
var renderer = new CanvasRenderer(w, h);
document.querySelector('#board').appendChild(renderer.view);

// Load game textures
var textures = {
  tiles: new Texture('res/images/tiles.png'),
  rover: new Texture('res/images/footman.png'),
  moonlet: new Texture('res/images/moonlet.png')
};

var controls = new Controls();
var scene;

function titleScreen () {
  scene = new TitleScreen(renderer.view, controls, newGame);
}

function gameOverScreen (result) {
  scene = new GameOverScreen(renderer.view, controls, result, titleScreen);
}

function newGame () {
  scene = new GameScreen(renderer.view, controls, gameOverScreen);
}

// Main loop
var dt, last;

function loopy (t) {
  requestAnimationFrame(loopy);

  if (!last) last = t;
  dt = t - last;
  last = t;

  // Update & render everything
  scene.update(dt, t);
  renderer.render(scene);

}
newGame();
requestAnimationFrame(loopy);
