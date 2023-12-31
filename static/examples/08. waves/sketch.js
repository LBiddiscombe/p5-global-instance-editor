const res = 8;
let xoff = 0;
let yoff = 2.5;
let prevSy;
const speedFactor = 0.5;

let wave = [];
let shadow = [];

function setup() {
	createCanvas(windowWidth, 400);
	noiseSeed(0);
	noStroke();
}

function draw() {
	background(245, 222, 179);

	const sy = sin(yoff);
	generateWave(sy);

	const shadowColor = color(0, 0, 0, map(sy, -1, 1, 12, 0));
	const shadowOffset = map(sy, -1, 1, 0, height / 4);
	drawWave(shadow, shadowColor, shadowOffset);
	drawWave(wave, color(128, 144, 194));

	prevSy = sy;
	xoff += 0.1;
	yoff += map(sy, 0, 1, 0.03 * speedFactor, 0.008, true);
}

function generateWave(sy) {
	if (sy > -0.01 && sy < 0.01) noiseSeed(random(1000));
	wave = [];
	wave.push({ x: width, y: height });
	wave.push({ x: 0, y: height });
	for (let x = 0; x < width + res; x += res) {
		const y = height + height / 8;
		const ny = (noise((x + xoff) / 200) * sy * height) / 1 - height / 4;
		const cy = (cos(((x + yoff * 100) / width) * 4) * height) / 8;

		wave.push({ x, y: y + ny + cy });
	}

	// at the peak set the shadow wave
	if (shadow.length === 0 && sy > prevSy) {
		shadow = [...wave];
	}
	// at the trough delete the shadow
	if (shadow.length > 0 && sy < prevSy) {
		shadow = [];
	}
}

function drawWave(points, col, yoffset = 0) {
	beginShape();
	for (let p of points) {
		vertex(p.x, p.y + yoffset);
	}
	fill(col);
	endShape(CLOSE);
}
