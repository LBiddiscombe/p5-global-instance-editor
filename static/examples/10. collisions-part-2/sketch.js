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
		ball.applyForce(
			createVector(random(-ball.mass * 3, ball.mass * 3), random(-ball.mass * 3, ball.mass * 3))
		);
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
