import { describe, it, expect } from 'vitest';
import { convert } from '$lib/converter-babel';

describe('p5 top level scope functionDeclarations to expressionStatements', () => {
  it('converts setup', async () => {
    const input = 'function setup() {}'
    const output = 'p.setup = function () {};'
    expect(convert(input, 'p')).toBe(output);
  });

  it('converts draw', async () => {
    const input = 'function draw() {}'
    const output = 'p.draw = function () {};'
    expect(convert(input, 'p')).toBe(output);
  });
});

describe('wraps p5 functions with instance', () => {
  it('wraps createCanvas', async () => {
    const input = 'createCanvas(400, 400)'
    const output = 'p.createCanvas(400, 400);'
    expect(convert(input, 'p')).toBe(output);
  });
  it('wraps drawingContext', async () => {
    const input = 'drawingContext.getTransform()'
    const output = 'p.drawingContext.getTransform();'
    expect(convert(input, 'p')).toBe(output);
  });
  it('wraps mag(a,b)', async () => {
    const input = 'mag(a,b)'
    const output = 'p.mag(a, b);'
    expect(convert(input, 'p')).toBe(output);
  });
  it('doesnt wrap v.mag()', async () => {
    const input = 'v.mag()'
    const output = 'v.mag();'
    expect(convert(input, 'p')).toBe(output);
  });
})