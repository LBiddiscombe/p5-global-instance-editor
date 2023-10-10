let fishes = [];

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 500; i++) {
    fishes.push(new Fish(random(width), random(height)));
  }
  const byCol = (a, b) => {
    if (a.col < b.col) {
      return -1;
    } else if (a.col > b.col) {
      return 1;
    }
    return 0;
  };
  fishes.sort(byCol);
}

function draw() {
  background(0);
  for (let fish of fishes) {
    fish.attractCentre();
    fish.update();
    fish.show();

    if (random() < 0.1) {
      const force = createVector(random(-1, 1), random(-1, 1));
      fish.applyForce(force);
    }
  }
}

class Fish {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.pos = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 2; // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
    this.points = [];
    this.col = random(255);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  attractCentre() {
    const centre = createVector(width / 2, height / 2);
    const dir = centre.sub(this.pos);
    dir.normalize();
    dir.mult(0.03);
    this.applyForce(dir);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.pos.add(this.velocity);
    this.acceleration.mult(0);

    this.points.push(this.pos.copy());
    if (this.points.length > 10) {
      this.points.splice(0, 1);
      //this.scaleToConstantLength();
    }
  }

  show() {
    for (var i = 0; i < this.points.length; i++) {
      noStroke();
      fill(this.col);
      circle(this.points[i].x, this.points[i].y, i);
    }
  }
}
