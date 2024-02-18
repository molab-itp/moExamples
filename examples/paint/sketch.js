// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote

// participants can cast a numeric vote up or down

let my = {};

// mo-vote/device/{uid}/paint
//    x0, y0, brush_size, color_index, width, height

function my_setup() {
  my.full_screen = 0;
  if (my.full_screen) {
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
  my.brush = new Brush({ width: my.width, height: my.height });
  my.clear_action = 0;
  //
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);

  dbase_app_init({ completed: startup_completed });

  background(200);

  createButton('Clear').mousePressed(clearAction);
  createSpan('•');
  createButton('Brush: Smaller').mousePressed(smallerBrushSizeAction);
  createButton('Larger').mousePressed(largerBrushSizeAction);
  createSpan('•');
  createButton('Cross: Smaller').mousePressed(smallerCrossSizeAction);
  createButton('Larger').mousePressed(largerCrossSizeAction);
}

function draw() {
  if (mouseIsPressed && mouseInCanvas()) {
    my.brush.mouseDragged();
  }
  my.brush.render_cross();
  image(my.brush.layer, 0, 0);
}

function mouseInCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY < height;
}

function canvas_mousePressed() {
  // console.log('mousePressed mouseX', mouseX, 'mouseY', mouseY);
  my.brush.mousePressed();
}

function canvas_mouseReleased() {
  my.brush.mouseReleased();
}

function clearAction() {
  background(200);
  issue_clear_action();
}

function smallerCrossSizeAction() {
  my.brush.adjust_cross_size(-1);
  my.brush.next_lineColor();
}

function largerCrossSizeAction() {
  my.brush.adjust_cross_size(1);
  my.brush.next_lineColor();
}

function smallerBrushSizeAction() {
  my.brush.adjust_brush_size(-1);
  my.brush.next_lineColor();
}

function largerBrushSizeAction() {
  my.brush.adjust_brush_size(1);
  my.brush.next_lineColor();
}
