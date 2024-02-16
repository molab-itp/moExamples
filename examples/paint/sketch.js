// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote

// participants can cast a numeric vote up or down

let my = {};

// mo-vote/device/{uid}/vote
//    individual vote

function my_setup() {
  my.width = windowWidth;
  // Leave room at bottom for buttons
  my.height = windowHeight - 60;
  //
  // my.fireb_config = 'jht9629';
  my.fireb_config = 'jht1493';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.mo_app = 'mo-vote';
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
  my.color = 'red';
  my.colorIndex = 0;
  my.colorGold = [187, 165, 61];
  my.colors = ['red', 'green', my.colorGold];
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);
  // noCanvas();

  my.x = width * 0.5;
  my.y = height * 0.5;

  dbase_app_init({ completed: startup_completed });

  background(200);
  noStroke();

  init_buttons();
}

function draw() {
  // background(200);
  //
  if (!check_devices()) return;
  //
  if (my.color) {
    fill(my.color);
    rect(my.x, my.y, my.xlen, my.ylen);
  }
  my.x = (my.x + my.xSpeed + width) % width;
  my.y = (my.y + my.ySpeed + height) % height;
}

function init_buttons() {
  createButton('Paint Off').mousePressed(paintOffAction);
  createButton('Pen Red').mousePressed(paintRedAction);
  createButton('Pen Green').mousePressed(paintGreenAction);
  createButton('Pen Gold').mousePressed(paintGoldAction);
  createElement('br');
  createButton('Move Left').mousePressed(moveLeftAction);
  createButton('Move Right').mousePressed(moveRightAction);
  createButton('Move Up').mousePressed(moveUpAction);
  createButton('Move Down').mousePressed(moveDownAction);
}
