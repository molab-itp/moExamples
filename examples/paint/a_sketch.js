// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote

// participants can cast a numeric vote up or down

let my = {};

// mo-paint/device/{uid}
//  { cross_x0, cross_y0, cross_size,
//    brush_x0, brush_y0, brush_size,
//    color_index, width, height
//  };

function setup() {
  my_init();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);

  my.devices = [];
  dbase_app_init({ completed: startup_completed });

  background(0);

  createButton('Clear').mousePressed(clearAction);
  createSpan('•');
  createButton('Brush: Smaller').mousePressed(smallerBrushSizeAction);
  createButton('Larger').mousePressed(largerBrushSizeAction);
  createSpan('•');
  createButton('Cross: Smaller').mousePressed(smallerCrossSizeAction);
  createButton('Larger').mousePressed(largerCrossSizeAction);

  my.brush = new Brush({ width: my.width, height: my.height });
}

function draw() {
  if (mouseIsPressed && mouseInCanvas()) {
    my.brush.mouseDragged();
  }
  my.brush.render_cross();
  image(my.brush.layer, 0, 0);
  draw_devices();
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
  background(0);
  my.brush.clear();
  issue_clear_action();
}

function smallerCrossSizeAction() {
  my.brush.adjust_cross_size(-1);
  my.brush.next_crossColor();
}

function largerCrossSizeAction() {
  my.brush.adjust_cross_size(1);
  my.brush.next_crossColor();
}

function smallerBrushSizeAction() {
  my.brush.adjust_brush_size(-1);
  my.brush.next_brushColor();
}

function largerBrushSizeAction() {
  my.brush.adjust_brush_size(1);
  my.brush.next_brushColor();
}
