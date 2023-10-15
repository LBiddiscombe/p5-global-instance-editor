let NUM_PIPES = 2;
let pipes = [];
let bird;
let gravity;
let score = 0;
let bestScore = 0;
let view = "title";
let startDelay = 0;

function setup() {
  createCanvas(800, 400);
  gravity = createVector(0, 1.5);
}

function restart() {
  score = 0;
  pipes = [];
  for (let i = 0; i < NUM_PIPES; i++) {
    pipes.push(new Pipe(width + ((width / NUM_PIPES) * i)));
  }
  bird = new Bird(width * 0.1, height / 2, 4);
}

function draw() {
  background(169, 220, 241);


  if (view === 'title') {
    drawTitleScreen();
    return;
  }

  if (view === 'new') {
    restart();
    view = 'game';
  }

  bird.applyForce(gravity);
  bird.update();
  bird.show();

  for (let i = pipes.length - 1; i >= 0; i--) {
    const pipe = pipes[i];
    pipe.update();
    pipe.collides(bird);
    pipe.show();


    if (!pipe.isPassed && pipe.x < bird.pos.x) {
      score += 1;
      pipe.isPassed = true;
    }

    if (pipe.isDead()) {
      pipes.push(new Pipe(width + ((width / NUM_PIPES) * i)));
      pipes.splice(i, 1);
    }
  }

  fill(0);
  textSize(24);
  text(`Score: ${score}`, 10, 30);

}

function drawTitleScreen() {

  if (score > bestScore) bestScore = score;

  fill(0);
  textSize(64);
  text("Flappy Circle", 220, 160);

  textSize(32);
  text("Tap, or press any key to start", 200, 230);

  textSize(24);
  text(`Score: ${score}  /  Best: ${bestScore}`, 10, 30);

  startDelay += 1;

}

function tap() {
  if (view === 'title') {
    if (startDelay >= 0) {
      view = 'new';
    }
    return;
  }

  if (view === 'game') {
    bird.applyForce(createVector(0, -75));
  }
}

function keyPressed() {
  tap();
}

function touchStarted() {
  tap();
}

function mousePressed() {
  tap();
}