// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote

// participants can cast a numeric vote up or down

let my = {};

// mo-vote/device/{uid}/paint
//    x0, y0, brush_size, color_index

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
  my.color_index = 0;
  my.colors = ['red', 'green', my.colorGold, 0];
  {
    let x = my.width * 0.5;
    let y = my.height * 0.5;
    brush_init(x, y);
  }
  my.hitEdge = 0;
  my.brush_size = 4;
  my.clear_action = 0;
  //
  my.layer = createGraphics(my.width, my.height);
}

function brush_init(x, y) {
  my.x0 = x;
  my.y0 = y;
  my.xLeft = my.x0;
  my.yTop = my.y0;
  my.xRight = my.x0;
  my.yBottom = my.y0;
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mousePressed(canvas_mousePressed);

  dbase_app_init({ completed: startup_completed });

  background(200);

  createButton('Clear').mousePressed(clearAction);
  createSpan('Brush ');
  createButton('Smaller').mousePressed(smallerBrushSizeAction);
  createButton('Larger').mousePressed(largerBrushSizeAction);
}

function draw() {
  if (mouseIsPressed && mouseInCanvas()) {
    let colr = my.colors[my.color_index];
    strokeWeight(my.brush_size);
    stroke(colr);
    line(pmouseX, pmouseY, mouseX, mouseY);
    brush_init(mouseX, mouseY);
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
  my.brush_size -= 1;
  next_lineColor();
}

function largerBrushSizeAction() {
  my.brush_size += 1;
  next_lineColor();
}

function clearAction() {
  background(200);
  issue_clear_action();
}
