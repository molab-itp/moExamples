// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote

// participants can cast a numeric vote up or down

let my = {};

// mo-vote/device/{uid}/paint
//    x, y, brush_size

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
  my.brushSize = 4;
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mousePressed(canvas_mousePressed);

  dbase_app_init({ completed: startup_completed });

  background(200);

  createButton('Clear').mousePressed(clearAction);
  createButton('Smaller Brush').mousePressed(smallerBrushSizeAction);
  createButton('Larger Brush').mousePressed(largerBrushSizeAction);
}

function draw() {
  if (mouseIsPressed && mouseInCanvas()) {
    let colr = my.colors[my.colorIndex];
    strokeWeight(my.brushSize);
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

function mouseInCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY < height;
}
function canvas_mousePressed() {
  // console.log('mousePressed mouseX', mouseX, 'mouseY', mouseY);
  next_lineColor();
}

function smallerBrushSizeAction() {
  my.brushSize -= 1;
  next_lineColor();
}

function largerBrushSizeAction() {
  my.brushSize += 1;
  next_lineColor();
}

function clearAction() {
  background(200);
}
