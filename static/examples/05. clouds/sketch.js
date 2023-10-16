const clouds = 8;
const cores = 16;
const tufts = 1000;

function setup() {
	createCanvas(600, 400);
	randomSeed(7); //comment this out for random clouds
}

function draw() {
	background(220);

	const gradient = drawingContext.createLinearGradient(0, 0, 0, height);
	gradient.addColorStop(0, color(128, 128, 255));
	gradient.addColorStop(1, color(222, 222, 255));
	drawingContext.fillStyle = gradient;
	noStroke();
	rect(0, 0, width, height);

	for (let cloud = 0; cloud < clouds; cloud++) {
		const cloudX = random(width);
		const cloudY = random(height / 2);
		for (let core = 0; core < cores; core++) {
			const coreX = randomGaussian(0, width / 10);
			const coreY = randomGaussian(0, 15);
			for (let tuft = 0; tuft < tufts; tuft++) {
				const tuftX = randomGaussian(0, 20);
				const tuftY = randomGaussian(0, 10);
				const radius = random(8, 16);
				fill(map(tuftY, -15, 15, 255, 222), 10);
				circle(cloudX + coreX + tuftX, cloudY + coreY + tuftY, radius);
			}
		}
	}

	noLoop();
}
