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
		const colIdx = Math.max(
			0,
			Math.min(Math.floor(particle.position.x / this.cellSize), this.numCols - 1)
		);
		const rowIdx = Math.max(
			0,
			Math.min(Math.floor(particle.position.y / this.cellSize), this.numRows - 1)
		);

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
