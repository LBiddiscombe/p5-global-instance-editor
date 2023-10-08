const clouds = 8;
const cores = 16;
const tufts = 1000;

function setup() {
  createCanvas(600, 400);
  randomSeed(7); //comment this out for random clouds
}

function draw() {
  background(220);

  const g = drawingContext.createLinearGradient(0, 0, 0, height);
  g.addColorStop(0, color(128, 128, 255));
  g.addColorStop(1, color(222, 222, 255));
  drawingContext.fillStyle = g;
  noStroke();
  rect(0, 0, width, height);

  for (let c = 0; c < clouds; c++) {
    const x = random(width);
    const y = random(height / 2);
    for (let i = 0; i < cores; i++) {
      const cx = randomGaussian(0, width / 10);
      const cy = randomGaussian(0, 15);
      for (let j = 0; j < tufts; j++) {
        const dx = randomGaussian(0, 20);
        const dy = randomGaussian(0, 10);
        const r = random(8, 16);
        fill(map(dy, -15, 15, 255, 222), 10);
        circle(x + +cx + dx, y + cy + dy, r);
      }
    }
  }

  noLoop();
}
