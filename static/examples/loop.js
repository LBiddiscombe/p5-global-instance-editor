/*
A P5 sketch based on this creation by @KomaTebe - https://twitter.com/KomaTebe/status/1622885628152086528?s=20

f=0,q=200,draw=r=>{for(f++||createCanvas(W=400,W),background(0),translate(w=200,W),stroke(W),n=1,y=0;y<W;y+=12)for(i=0;i<TAU;i+=PI/16)Y=y+f%12,strokeWeight((W-Y)/36/n),n=1==n?2:1,rotate(sin(Y/64-f/16+i)/w),point(sin(i)*Y,cos(i)*Y)};
*/


function setup() {
  createCanvas(408, 408);
}

function draw() {
  background(0);
  translate(width / 2, height);
  stroke(255);
  let n = 1;
  fill(255);
  for (let y = 0; y < width; y += 12) {
    for (let i = 0; i < TAU; i += TAU / 32) {
      const Y = y + frameCount % 12;
      strokeWeight((width - Y) / 32 / n);
      n = 1 == n ? 2 : 1;
      rotate(sin(Y / 64 - frameCount / 16 + i) / (width / 2));
      point(sin(i) * Y, cos(i) * Y);
    }
  }
  circle(0, 0, 16);
}