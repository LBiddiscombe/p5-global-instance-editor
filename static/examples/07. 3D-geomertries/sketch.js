function setup() {
	createCanvas(710, 400, WEBGL);
}

function draw() {
	background(250);

	const rotation = frameCount * 0.01;

	translate(-240, -100, 0);
	normalMaterial();
	push();
	rotateZ(rotation);
	rotateX(rotation);
	rotateY(rotation);
	plane(70);
	pop();

	translate(240, 0, 0);
	push();
	rotateZ(rotation);
	rotateX(rotation);
	rotateY(rotation);
	box(70);
	pop();

	translate(240, 0, 0);
	push();
	rotateZ(rotation);
	rotateX(rotation);
	rotateY(rotation);
	cylinder(70, 70);
	pop();

	translate(-240 * 2, 200, 0);
	push();
	rotateZ(rotation);
	rotateX(rotation);
	rotateY(rotation);
	cone(70, 70);
	pop();

	translate(240, 0, 0);
	push();
	rotateZ(rotation);
	rotateX(rotation);
	rotateY(rotation);
	torus(70, 20);
	pop();

	translate(240, 0, 0);
	push();
	rotateZ(rotation);
	rotateX(rotation);
	rotateY(rotation);
	sphere(70);
	pop();
}
