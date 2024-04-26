// https://editor.p5js.org/jht9629-nyu/sketches/xxxx
// video scan radial bounce

let my = {};

function my_setup() {
  // my.width = 640;
  // my.height = 480;
  my.width = 480;
  my.height = 640;
  my.strokeWeight = 1;
  my.rcenter = 0;
  my.xstep = 1;
  my.xstepStart = 1;
  my.ang = 0;
  my.astep = 0.1;
  my.faster = 1;

  my.xgap_start = my.rcenter;
  my.xgap_end = my.height;
  my.xgap = my.xgap_start;
  my.secsPerUpdate = 0.1;
  my.secsDelta = 0;

  my.downFactor = 1;

  // my.x0;
  // my.y0;
  // my.capture;
  // my.img;
}

function setup() {
  my_setup();

  createCanvas(my.width, my.height);

  my.capture = createCapture(VIDEO);
  my.capture.size(width, height);
  my.capture.hide();
  my.x0 = int(my.width / 2);
  my.y0 = int(my.height / 2);
}

function draw() {
  strokeWeight(my.strokeWeight);
  my.img = my.capture.get();
  let more = 1;
  while (more) {
    more = draw_out();
    if (!my.faster) more = 0;
  }
}

function draw_out() {
  // colorMode(HSB);

  let r = my.xgap / 2;
  let rang = radians(my.ang);
  let x1 = r * cos(rang);
  let y1 = r * sin(rang);

  let c1 = my.img.get(my.x0 + x1, my.y0 + y1);
  stroke(c1);
  fill(c1);
  circle(my.x0 + x1, my.y0 + y1, my.rcenter);

  let r2 = my.width;
  let x2 = r2 * cos(rang);
  let y2 = r2 * sin(rang);
  line(my.x0 + x1, my.y0 + y1, my.x0 + x2, my.y0 + y2);

  my.ang = my.ang + my.astep;
  if (my.ang > 360) {
    my.ang = 0;
    next_step();
    return 0;
  }
  return 1;
}

function next_step() {
  my.secsDelta += deltaTime / 1000;
  if (my.secsDelta < my.secsPerUpdate) {
    return;
  }
  my.secsDelta = 0;
  my.xgap += my.xstep;
  if (my.xstep > 0 && my.xgap > my.xgap_end) {
    my.xstep = -1 * my.xstep * my.downFactor;
    my.xgap += my.xstep;
  } else if (my.xstep < 0 && my.xgap < my.xgap_start) {
    my.xstep = -1 * my.xstep;
    my.xgap += my.xstep;
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   my.width = windowWidth;
//   my.height = windowHeight;
// }

// https://editor.p5js.org/jht9629-nyu/sketches/OReZ4wOR5
// video scan radial v5

// https://editor.p5js.org/jht9629-nyu/sketches/7vllrM5d5
// video scan radial v4

// https://editor.p5js.org/jht9629-nyu/sketches/WdNVtxQzf
// video scan radial v3

// https://editor.p5js.org/jht9629-nyu/sketches/cKzXO8eUG
// video scan radial v2

// https://editor.p5js.org/jht1900/sketches/-Ypn6ODK_
// video scan radial

// https://editor.p5js.org/jht1493/sketches/mEXETIijv
// video scan gap center

// https://editor.p5js.org/jht1493/sketches/oHVI5tU4BP
// video scan gap

// https://editor.p5js.org/jht1493/sketches/Q9jdcICpW
// video scan mouseY

// https://editor.p5js.org/jht1493/sketches/gnx2IQn1N
// video scan

// https://github.com/processing/p5.js/wiki/Beyond-the-canvas#capture-live-video

// https://editor.p5js.org/jht9629-nyu/sketches/nkw-sZXwN
// video scan radial v6
