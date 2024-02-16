// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote

// participants can cast a numeric vote up or down

let my = {};

// mo-vote/device/{uid}/vote
//    individual vote

function my_setup() {
  if (0) {
    my.width = windowWidth;
    // Leave room at bottom for buttons
    my.height = windowHeight - 60;
  } else {
    my.width = 200;
    my.height = 200;
  }
  //
  // my.fireb_config = 'jht9629';
  my.fireb_config = 'jht1493';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.mo_app = 'mo-paint';
  my.nameDevice = '';
  //
  my.stored_devices = {};
  //
  my.x = 0;
  my.y = 0;
  my.xlen = 10;
  my.ylen = 10;
  my.xSpeed = 0;
  my.ySpeed = 0;
  my.colorGold = [187, 165, 61];
  my.colorIndex = 0;
  my.colors = ['red', 'green', my.colorGold, 0];
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);
  // noCanvas();

  my.x = width * 0.5;
  my.y = height * 0.5;

  dbase_app_init({ completed: startup_completed });

  background(200);
  // noStroke();
  strokeWeight(my.xlen);

  createButton('Clear').mousePressed(clearAction);
}

function draw() {
  // background(200);
  //
  if (mouseIsPressed) {
    let colr = my.colors[my.colorIndex];
    // fill(colr);
    // rect(mouseX, mouseY, my.xlen, my.ylen);
    stroke(colr);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function clearAction() {
  background(200);
}

function mousePressed() {
  my.colorIndex = (my.colorIndex + 1) % my.colors.length;
}
