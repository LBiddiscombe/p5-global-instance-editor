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

class Pipe {
  constructor(x) {
    this.x = x;
    this.gap = height * random(0.2, 0.4);
    this.gapY = random(height - this.gap);
    this.isPassed = false;
  }

  update() {
    this.x -= 10;
  }

  collides(bird) {
    if (this.x > bird.pos.x + bird.radius) return;
    if (this.x + 50 < bird.pos.x - bird.radius) return;
    if (bird.pos.y - bird.radius > this.gapY && bird.pos.y + bird.radius < this.gapY + this.gap) return;

    bird.isDead = true;
    view = 'title';
    startDelay = -60;
  }

  isDead() {
    return this.x < -50;
  }

  show() {
    noStroke();
    fill(80, 160, 80);
    rect(this.x, 0, 50, this.gapY);
    rect(this.x, this.gapY + this.gap, 50, height - this.gapY + this.gap);
  }
}

class Bird {
  constructor(x, y, mass = 1) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -50);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.radius = mass * 4;
    this.maxspeed = 7;
    this.isDead = false;

  }

  applyForce(force) {
    let f = createVector();
    f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    fill(220, 241, 169);
    stroke(0);
    strokeWeight(2);
    circle(this.pos.x, this.pos.y, this.radius * 2);
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