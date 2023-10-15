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