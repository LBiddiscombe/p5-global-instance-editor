/*
  A more advanced collision approach. This one used a grid based broad phase approach.

  A Ball class, based on the Mover class from the Nature of Code by Daniel Shiffman

  Try increasing the number of balls on line 15, and see how many collision checks are performed now
*/

let balls = [];
let grid;

function setup() {
  createCanvas(800, 800);
  grid = new Grid(width, height, 20);
  for (let i = 0; i < 100; i++) {
    const ball = new Ball(random(700) + 50, random(700) + 50, floor(random(2)) + 2);
    ball.applyForce(createVector(random(-ball.mass * 3, ball.mass * 3), random(-ball.mass * 3, ball.mass * 3)));
    balls.push(ball);
    grid.addParticle(ball);
  }
}

function draw() {
  background(240);

  let tot = 0;
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    const neighbors = grid.getNeighbors(ball);
    for (let other of neighbors) {
      tot += 1;
      ball.collide(other);
    }
    ball.update();
    ball.bounceEdges();
    ball.show();

    grid.removeParticle(ball);
    grid.addParticle(ball);
  }

  stroke(0);
  fill(255);
  textSize(32);
  text('Balls: ' + balls.length, 10, 30);
  fill(127, 255, 127);
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

      let movement = vRelPos.copy().setMag(abs(dist / 2));
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

/*
  The Grid lookup broad phase collision helper
*/
class Grid {
  constructor(canv_wid, canv_hei, s) {

    this.cellSize = s;

    this.numCols = Math.ceil(canv_wid / s);
    this.numRows = Math.ceil(canv_hei / s);

    console.log(this.numCols, this.numRows);

    this.cells = [];

    for (let x = 0; x < this.numCols; x++) {
      this.cells[x] = [];
      for (let y = 0; y < this.numRows; y++) {
        this.cells[x][y] = [];
      }
    }
  }

  addParticle(particle) {
    const colIdx = Math.max(0, Math.min(Math.floor(particle.position.x / this.cellSize), this.numCols - 1));
    const rowIdx = Math.max(0, Math.min(Math.floor(particle.position.y / this.cellSize), this.numRows - 1));

    this.cells[colIdx][rowIdx].push(particle);
    particle.gridCell = { col: colIdx, row: rowIdx };
  }

  removeParticle(particle) {
    const { col, row } = particle.gridCell;
    const cell = this.cells[col][row];
    const particleIndex = cell.indexOf(particle);
    cell.splice(particleIndex, 1);
  }

  getNeighbors(particle) {
    const topLeft = [
      Math.floor((particle.position.x - particle.radius) / this.cellSize),
      Math.floor((particle.position.y - particle.radius) / this.cellSize)
    ];

    const bottomRight = [
      Math.floor((particle.position.x + particle.radius) / this.cellSize),
      Math.floor((particle.position.y + particle.radius) / this.cellSize)
    ];

    const neighbors = [];
    for (let i = topLeft[0]; i <= bottomRight[0]; i++) {
      for (let j = topLeft[1]; j <= bottomRight[1]; j++) {
        if (i < 0 || j < 0 || i >= this.numCols || j >= this.numRows) {
          continue;
        }
        const cell = this.cells[i][j];
        for (const p of cell) {
          if (p !== particle) {
            neighbors.push(p);
          }
        }
      }
    }

    return neighbors;
  }
}