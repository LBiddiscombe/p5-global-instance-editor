let angle;
let trunkCount;
let trunkLen = 80;
let xoff = 0;
let leaves = [];


function setup() {
  createCanvas(600, 400);

  trunkCount = floor(random(4)) + 1;
  //noiseSeed(0);
}

function draw() {
  background(255);

  angle = PI / 3;// map(mouseX, 0, width, 0, HALF_PI);

  push();
  translate(width / 2, height);
  stroke(0);
  xoff = 0;

  leaves = [];
  let len = trunkLen;
  for (let i = 0; i < trunkCount; i++) {
    branch(len, 0);
    len *= 0.8;
  }
  pop();

  for (let leaf of leaves) {
    push();
    translate(leaf.x, leaf.y);
    colorMode(HSL);
    fill(120, 50, random(30, 50));
    noStroke();
    for (let i = 0; i < 10; i++) {
      ellipse(random(-10, 10), random(-5, 5), 10, 5);
    }
    pop();
  }

  noLoop();

}

function branch(len, depth) {

  xoff += 1;
  const n = noise(xoff);

  if (len < trunkLen / 2 && n < 0.25) return;

  const lx = len;//map(n, 0, 1, 0, len);

  let sw = map(len, 2, 120, 1, 20);
  strokeWeight(sw);
  line(0, 0, 0, -lx);
  translate(0, -lx);

  len *= 0.67;

  if (len > trunkLen * 0.04) {
    push();
    rotate(angle * n);
    branch(len, depth + 1);
    pop();

    push();
    rotate(-angle * n);
    branch(len, depth + 1);
    pop();
  }
  else {
    leaves.push(getLocalPoint(0, 0));
  }
}

function getLocalPoint(x, y) {
  const matrix = drawingContext.getTransform();

  const pd = pixelDensity();

  return {
    x: (x * matrix.a + y * matrix.b + matrix.e) / pd,
    y: (x * matrix.a + y * matrix.b + matrix.f) / pd
  };
}

