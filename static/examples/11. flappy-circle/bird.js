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