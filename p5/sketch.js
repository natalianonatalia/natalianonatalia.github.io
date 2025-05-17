let blobSketch = (p) => {
  let rotX = 0, rotY = 0, rotZ = 0;
  let rotSpeedX, rotSpeedY, rotSpeedZ;

  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    canvas.parent("p5-container");
    p.noFill();
    p.strokeWeight(1.2);
    p.colorMode(p.HSB, 360, 100, 100, 100);

    rotSpeedX = p.random(0.001, 0.003);
    rotSpeedY = p.random(0.001, 0.003);
    rotSpeedZ = p.random(0.001, 0.003);
  };

  p.draw = function () {
    p.background(	257,	40,	91);

    p.orbitControl(0.5, 0.5, 0.01);
    p.rotateX(rotX);
    p.rotateY(rotY);
    p.rotateZ(rotZ);

    let d = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2);
    let proximity = p.map(d, 0, p.width / 2, 1.0, 0.6);

    let detail = 20;
    let radius = 300;
    let noiseScale = 2;
    let time = p.millis() * 0.001;

    for (let i = 0; i < detail; i++) {
      let phi = p.map(i, 0, detail, 0, p.PI);
      p.beginShape();
      for (let j = 0; j <= detail; j++) {
        let theta = p.map(j, 0, detail, 0, p.TWO_PI);
        let nx = p.sin(phi) * p.cos(theta);
        let ny = p.sin(phi) * p.sin(theta);
        let nz = p.cos(phi);
        let n = p.noise(nx * noiseScale + 10, ny * noiseScale + 10, nz * noiseScale + time);
        let distortion = p.map(n, 0, 1, -30, 30) * proximity;
        let r = radius + distortion;
        let x = r * nx;
        let y = r * ny;
        let z = r * nz;
        p.stroke((i * 5 + j * 3 + time * 40) % 360, 50, 100, 20);
        p.vertex(x, y, z);
      }
      p.endShape();
    }

    rotX += rotSpeedX;
    rotY += rotSpeedY;
    rotZ += rotSpeedZ;
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(blobSketch);
