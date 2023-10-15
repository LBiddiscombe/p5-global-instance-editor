/*
  The Ball
*/
class Ball {
  constructor(x, y, mass = 1, col = 'blue') {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
    this.radius = mass * 4;
    this.col = col;
    this.invMass = 1 / mass;
    this.maxspeed = 5;

  }
  // Newton's 2nd law: F = M * A 
  // or A = F / M
  applyForce(force) {
    let f = createVector();
    f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  collide(other) {

    let vRelPos = p5.Vector.sub(this.position, other.position);
    let d = vRelPos.mag() - (this.radius + other.radius);
    if (d < 0) {

      let movement = vRelPos.copy().setMag(abs(d / 2));
      this.position.add(movement);
      other.position.sub(movement);

      let vRelVelocity = p5.Vector.sub(this.velocity, other.velocity);
      const contactNormal = vRelPos.copy().normalize();

      const impulseMag = -(2 * vRelVelocity.dot(contactNormal)) / (this.invMass + other.invMass);;
      const impulseForce = contactNormal.copy().mult(impulseMag);

      this.applyForce(impulseForce.copy());
      other.applyForce(impulseForce.copy().mult(-1));
    }
  }

  bounceEdges() {
    const { x, y } = this.position;
    const { radius } = this;

    if (x + radius > width || x - radius < 0) {
      this.velocity.x *= -1;
      this.position.x = constrain(this.position.x, radius, width - radius);
    }

    if (y + radius > height || y - radius < 0) {
      this.velocity.y *= -1;
      this.position.y = constrain(this.position.y, radius, height - radius);
    }
  }

  show() {
    fill(this.col);
    circle(this.position.x, this.position.y, this.radius * 2);
  }
}
