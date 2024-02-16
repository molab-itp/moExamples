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
  my.device_values = {};
  //
  my.colorGold = [187, 165, 61];
  my.colorIndex = 0;
  my.colors = ['red', 'green', my.colorGold, 0];
  my.x0 = my.width * 0.5;
  my.y0 = my.height * 0.5;
  my.xRight = my.x0;
  my.yTop = my.y0;
  my.xLeft = my.x0;
  my.yBottom = my.y0;
  my.hitEdge = 0;
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);

  dbase_app_init({ completed: startup_completed });

  background(200);

  createButton('Clear').mousePressed(clearAction);
}

function draw() {
  // background(200);
  //
  if (pmouseX < 0 || pmouseY < 0) {
    return;
  }
  if (mouseIsPressed) {
    let colr = my.colors[my.colorIndex];
    strokeWeight(4);
    stroke(colr);
    line(pmouseX, pmouseY, mouseX, mouseY);
    my.x0 = mouseX;
    my.y0 = mouseY;
    my.xRight = my.x0;
    my.yTop = my.y0;
    my.xLeft = my.x0;
    my.yBottom = my.y0;
  } else {
    draw_cross();
  }
}

function mousePressed() {
  // console.log('mousePressed mouseX', mouseX, 'mouseY', mouseY);
  next_lineColor();
}

function draw_cross() {
  //
  my.xRight += 1;
  if (my.xRight > my.width) {
    my.hitEdge += 1;
    my.xRight = my.x0;
  }
  strokeWeight(4);
  stroke(lineColor(0));
  line(my.x0, my.y0, my.xRight, my.y0);

  my.yBottom += 1;
  if (my.yBottom > my.height) {
    my.hitEdge += 1;
    my.yBottom = my.y0;
  }
  stroke(lineColor(1));
  line(my.x0, my.y0, my.x0, my.yBottom);

  my.xLeft -= 1;
  if (my.xLeft < 0) {
    my.hitEdge += 1;
    my.xLeft = my.x0;
  }
  stroke(lineColor(2));
  line(my.x0, my.y0, my.xLeft, my.y0);

  my.yTop -= 1;
  if (my.yTop < 0) {
    my.hitEdge += 1;
    my.yTop = my.y0;
  }
  stroke(lineColor(3));
  line(my.x0, my.y0, my.x0, my.yTop);

  if (my.hitEdge >= 4) {
    my.hitEdge = 0;
    next_lineColor();
  }
}

function next_lineColor() {
  my.colorIndex = (my.colorIndex + 1) % my.colors.length;
}

function lineColor(iline) {
  // return my.colors[my.lineColors[ci]];
  return my.colors[my.colorIndex];
}

function clearAction() {
  background(200);
}
