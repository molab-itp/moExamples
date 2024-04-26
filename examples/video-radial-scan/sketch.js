// https://editor.p5js.org/jht9629-nyu/sketches/xxxx
// video scan radial bounce

// add pause
// add cycle up and down

let my = {};

function my_setup() {
  // my.x0;
  // my.y0;
  // my.capture;
  // my.img;

  my.nwidth = 640;
  my.nheight = 480;
  my.sw = 10;
  my.rcenter = 10;
  my.ang = 0;
  my.astep = 1;
  my.faster = 1;

  my.n = 20;
  my.nfrom = 20;
  my.nto = 1;
  my.xgap_start = my.rcenter;
  my.xgap_end = my.nheight;
  my.xgap = my.xgap_start;
  my.xstep = my.rcenter;
  my.outter_radius = my.nwidth;
  my.secsPerUpdate = 0.1;
  my.secsDelta = 0;
}

function setup() {
  my_setup();

  createCanvas(my.nwidth, my.nheight);

  my.capture = createCapture(VIDEO);
  my.capture.size(width, height);
  my.capture.hide();
  my.x0 = int(my.nwidth / 2);
  my.y0 = int(my.nheight / 2);
}

function draw() {
  strokeWeight(my.sw);
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

  let r2 = my.nwidth;
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
  my.secsDelta += my.deltaTime / 1000;
  if (my.secsDelta < my.secsPerUpdate) {
    return;
  }
  my.secsDelta = 0;
  my.xgap += my.xstep;
  if (my.xgap > my.xgap_end) {
    my.xgap = my.xgap_start;
    if (my.capture.loadedmetadata) {
      my.outter_radius = -1;
    }
  }
}

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
