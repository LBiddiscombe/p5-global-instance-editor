/*
  A naive approach to collision detection, every balls checks against every other

  A Ball class, based on the Mover class from the Nature of Code by Daniel Shiffman

  Try increasing the number of balls on line 13, and see how many collision checks are performed
*/

let balls = [];

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < 20; i++) {
    const ball = new Ball(random(700) + 50, random(700) + 50, floor(random(2)) + 2);
    ball.applyForce(createVector(random(-ball.mass * 3, ball.mass * 3), random(-ball.mass * 3, ball.mass * 3)));
    balls.push(ball);
  }
}

function draw() {
  background(240);

  let tot = 0;
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    for (let j = i + 1; j < balls.length; j++) {
      tot += 1;
      balls[i].collide(balls[j]);
    }
    ball.update();
    ball.bounceEdges();
    ball.show();
  }

  stroke(0);
  fill(255);
  textSize(32);
  text('Balls: ' + balls.length, 10, 30);
  fill(255, 127, 127);
  text('Collision checks per frame: ' + tot, 200, 30);

}

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
