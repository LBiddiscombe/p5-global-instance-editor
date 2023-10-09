// Based on an example by
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let lsystem;
let turtle;

function setup() {
  createCanvas(400, 400);

  const configs = {
    fern: {
      generations: 7,
      len: 1,
      axiom: "X",
      rules: { X: "F[+X][-X]FX", F: "FF" },
      angle: radians(-25.7)
    },
    bush: {
      generations: 4,
      len: 7,
      axiom: "F",
      rules: { F: "FF+[+F-F-F]-[-F+F+F]" },
      angle: radians(-25.7)
    }
  };

  let config = configs.bush;
  lsystem = new LSystem(config.axiom, config.rules);
  turtle = new Turtle(config.len, config.angle);

  for (let i = 0; i < config.generations; i++) {
    lsystem.generate();
  }
}

function draw() {
  background(255);
  translate(width / 2, height);
  turtle.render(lsystem.sentence);
  noLoop();
}

// An LSystem has a starting sentence
// An a ruleset
// Each generation recursively replaces characters in the sentence
// Based on the ruleset

// Construct an LSystem with a starting sentence and a ruleset
class LSystem {
  constructor(axiom, rules) {
    this.sentence = axiom; // The sentence (a String)
    this.ruleset = rules; // The ruleset (an array of Rule objects)
  }

  // Generate the next generation
  generate() {
    // An empty string that we will fill
    let nextgen = "";
    // For every character in the sentence
    for (let i = 0; i < this.sentence.length; i++) {
      // What is the character
      // We will replace it with itself unless it matches one of our rules
      let c = this.sentence.charAt(i);
      let next = this.ruleset[c] || c;
      // Append replacement String
      nextgen += next;
    }
    // Replace sentence
    this.sentence = nextgen;
  }

}

class Turtle {
  constructor(length, angle) {
    this.length = length;
    this.angle = angle;
  }

  render(sentence) {
    stroke(0);
    for (let i = 0; i < sentence.length; i++) {
      let c = sentence.charAt(i);
      if (c === "F" || c === "G") {
        line(0, 0, 0, -this.length);
        translate(0, -this.length);
      } else if (c === "+") {
        rotate(this.angle);
      } else if (c === "-") {
        rotate(-this.angle);
      } else if (c === "[") {
        push();
      } else if (c === "]") {
        pop();
      }
    }
  }
}