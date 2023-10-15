let fishes = [];

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 500; i++) {
    fishes.push(new Fish(random(width), random(height)));
  }
  const byCol = (a, b) => {
    if (a.col < b.col) {
      return -1;
    } else if (a.col > b.col) {
      return 1;
    }
    return 0;
  };
  fishes.sort(byCol);
}

function draw() {
  background(0);
  for (let fish of fishes) {
    fish.attractCentre();
    fish.update();
    fish.show();

    if (random() < 0.1) {
      const force = createVector(random(-1, 1), random(-1, 1));
      fish.applyForce(force);
    }
  }
}
