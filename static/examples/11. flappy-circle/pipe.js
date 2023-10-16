class Pipe {
	constructor(x) {
		this.x = x;
		this.gap = height * random(0.2, 0.4);
		this.gapY = random(height - this.gap);
		this.isPassed = false;
	}

	update() {
		this.x -= 10;
	}

	collides(bird) {
		if (this.x > bird.pos.x + bird.radius) return;
		if (this.x + 50 < bird.pos.x - bird.radius) return;
		if (bird.pos.y - bird.radius > this.gapY && bird.pos.y + bird.radius < this.gapY + this.gap)
			return;

		bird.isDead = true;
		view = 'title';
		startDelay = -60;
	}

	isDead() {
		return this.x < -50;
	}

	show() {
		noStroke();
		fill(80, 160, 80);
		rect(this.x, 0, 50, this.gapY);
		rect(this.x, this.gapY + this.gap, 50, height - this.gapY + this.gap);
	}
}
