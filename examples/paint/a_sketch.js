// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote

// participants can cast a numeric vote up or down
// must be in portrait orientation to see crosses

let my = {};

// mo-paint/a_device/{uid}
//  { cross_x0, cross_y0, cross_size,
//    brush_x0, brush_y0, brush_size,
//    color_index, width, height
//  };

// p5.disableFriendlyErrors = true; // disables FES to improve performance

function setup() {
  my_init();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_mouseReleased);

  dbase_app_init({ completed: startup_completed });

  background(0);

  createButton('Clear').mousePressed(clearAction);
  createSpan('•');
  createButton('Cross: Larger').mousePressed(largerCrossSizeAction);
  createButton('Smaller').mousePressed(smallerCrossSizeAction);
  createSpan('•');
  createButton('Brush: Larger').mousePressed(largerBrushSizeAction);
  createButton('Smaller').mousePressed(smallerBrushSizeAction);

  // createSpan('•');
  // createButton('Spawn').mousePressed(spawnAction);
  // my.spawn_count_span = createSpan('');

  // init_brush();
}

function init_brush() {
  let width = my.width;
  let height = my.height;
  let db_update = 1;
  let cross_limit = my.cross_limit;
  let isRemote = my.isRemote;
  my.brush = new Brush({ width, height, db_update, cross_limit, isRemote });
}

function draw() {
  if (!my.brush) return;
  dbase_poll();
  if (my.isRemote) {
    if (mouseIsPressed && mouse_in_canvas()) {
      my.brush.mouseDragged();
    }
    my.brush.render();
    image(my.brush.layer, 0, 0);
  } else {
    draw_devices();
  }
}

function clearAction() {
  if (my.isRemote) {
    // my.brush.clear();
    dbase_issue_actions({ clear_action: 1 });
  } else {
    background(0);
    dbase_issue_actions({ clear_action: 1 }, { all: 1 });
    // dbase_a_devices_issue_actions({ clear_action: 1 });
    deinit_brushes();
  }
}

function mouseDragged() {
  // console.log('mouseDragged');
  // return false; // required to prevent touch drag moving canvas on mobile
  return !mouse_in_canvas();
}

function mouse_in_canvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY < height;
}

function canvas_mousePressed() {
  // console.log('mousePressed mouseX', mouseX, 'mouseY', mouseY);
  my.brush.mousePressed();
}

function canvas_mouseReleased() {
  my.brush.mouseReleased();
}

//
// actions
//

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

// // function spawnAction() {
// //   //
// // }
