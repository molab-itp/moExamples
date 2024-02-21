class Brush {
  //
  static colorGold = [187, 165, 61];
  // static colors = ['red', 'green', Brush.colorGold, 0];
  // static colors = [[255, 0, 0], [0, 255, 0], Brush.colorGold, 0];
  static colors = [[255, 0, 0], [0, 255, 0], Brush.colorGold];

  //
  // {  width, height, layout, db_update }
  constructor(props) {
    let my = this;
    Object.assign(my, props);
    my.layer = createGraphics(my.width, my.height);
    my.brush_color_index = 0;
    my.cross_color_index = 0;
    my.hitEdge = 0;
    my.brush_size = 4;
    my.cross_size = 4;
    //
    my.init_no_update();
    if (my.db_update) {
      let { width, height } = my;
      dbase_queue_update({ width, height });
    }
  }

  init_no_update() {
    let my = this;
    let db_update = my.db_update;
    my.db_update = 0;
    my.init_xy();
    my.db_update = db_update;
    my.await_sync = my.db_update;
  }

  sync(uid) {
    let my = this;
    my.await_sync = 0;
    uid = uid || my.layout.uid;
    let device = dbase_a_device_for_uid(uid);
    // console.log('Brush sync uid', uid, 'device', device);
    if (!device) {
      console.log('Brush sync no device uid', uid);
      return;
    }
    Object.assign(my, device);
  }

  init_xy() {
    let my = this;
    let x = my.width * 0.5;
    let y = my.height * 0.5;
    my.init_brush(x, y);
    my.init_cross(x, y);
  }

  init_brush(x, y) {
    let my = this;
    my.brush_x0 = x;
    my.brush_y0 = y;
    if (my.db_update) {
      let { brush_x0, brush_y0 } = my;
      dbase_queue_update({ brush_x0, brush_y0 });
    }
  }

  init_cross(x, y) {
    let my = this;
    my.cross_x0 = x;
    my.cross_y0 = y;
    my.xLeft = my.cross_x0;
    my.yTop = my.cross_y0;
    my.xRight = my.cross_x0;
    my.yBottom = my.cross_y0;
    if (my.db_update) {
      let { cross_x0, cross_y0, xLeft, yTop, xRight, yBottom } = my;
      dbase_queue_update({ cross_x0, cross_y0, xLeft, yTop, xRight, yBottom });
    }
  }

  render_cross() {
    let my = this;
    if (my.await_sync) return;

    my.xRight += 1;
    if (my.xRight > my.width) {
      my.hitEdge += 1;
      my.xRight = my.cross_x0;
    }
    my.layer.strokeWeight(my.cross_size);
    my.layer.stroke(my.crossColor(0));
    my.layer.line(my.cross_x0, my.cross_y0, my.xRight, my.cross_y0);

    my.yBottom += 1;
    if (my.yBottom > my.height) {
      my.hitEdge += 1;
      my.yBottom = my.cross_y0;
    }
    my.layer.stroke(my.crossColor(1));
    my.layer.line(my.cross_x0, my.cross_y0, my.cross_x0, my.yBottom);

    my.xLeft -= 1;
    if (my.xLeft < 0) {
      my.hitEdge += 1;
      my.xLeft = my.cross_x0;
    }
    my.layer.stroke(my.crossColor(2));
    my.layer.line(my.cross_x0, my.cross_y0, my.xLeft, my.cross_y0);

    my.yTop -= 1;
    if (my.yTop < 0) {
      my.hitEdge += 1;
      my.yTop = my.cross_y0;
    }
    my.layer.stroke(my.crossColor(3));
    my.layer.line(my.cross_x0, my.cross_y0, my.cross_x0, my.yTop);

    if (my.hitEdge >= 4) {
      my.hitEdge = 0;
      my.next_crossColor();
    }

    if (my.db_update) {
      let { xLeft, yTop, xRight, yBottom } = my;
      dbase_queue_update({ xLeft, yTop, xRight, yBottom });
    }
  }

  mouseDragged() {
    let my = this;
    let colr = Brush.colors[my.brush_color_index];
    my.layer.strokeWeight(my.brush_size);
    my.layer.stroke(colr);
    my.layer.line(pmouseX, pmouseY, mouseX, mouseY);
    // my.init_brush(mouseX, mouseY);
    if (my.db_update) {
      my.brush_x0 = pmouseX;
      my.brush_y0 = pmouseY;
      my.brush_x1 = mouseX;
      my.brush_y1 = mouseY;
      let { brush_x0, brush_y0, brush_x1, brush_y1 } = my;
      dbase_queue_update({ brush_x0, brush_y0, brush_x1, brush_y1 });
    }
  }

  prepare_layer(status) {
    let my = this;
    if (dbase_actions_issued(my, { action_clear: 1 })) {
      status.cleared = 1;
      my.clear();
    }
    my.trackBrush();
    my.render_cross();
  }

  trackBrush() {
    let my = this;
    let colr = Brush.colors[my.brush_color_index];
    my.layer.strokeWeight(my.brush_size);
    my.layer.stroke(colr);
    if (my.brush_px1 != undefined) {
      if (my.brush_px1 > -1 && my.brush_x1 > -1) {
        my.layer.line(my.brush_px1, my.brush_py1, my.brush_x1, my.brush_y1);
      }
    }
    my.brush_px1 = my.brush_x1;
    my.brush_py1 = my.brush_y1;
  }

  mousePressed() {
    let my = this;
    my.lastMouseX = mouseX;
    my.lastMouseY = mouseY;
  }

  mouseReleased() {
    let my = this;
    if (mouseX == my.lastMouseX && mouseY == my.lastMouseY) {
      my.init_cross(mouseX, mouseY);
      my.next_crossColor();
    } else {
      my.next_brushColor();
    }
    if (my.db_update) {
      let brush_x1 = -1;
      dbase_queue_update({ brush_x1 });
    }
  }

  next_crossColor() {
    let my = this;
    my.cross_color_index = (my.cross_color_index + 1) % Brush.colors.length;
    // update_brush(my);
    if (my.db_update) {
      let cross_color_index = my.cross_color_index;
      dbase_queue_update({ cross_color_index });
    }
  }

  next_brushColor() {
    let my = this;
    my.brush_color_index = (my.brush_color_index + 1) % Brush.colors.length;
    // update_brush(my);
    if (my.db_update) {
      let brush_color_index = my.brush_color_index;
      dbase_queue_update({ brush_color_index });
    }
  }

  crossColor() {
    let my = this;
    return Brush.colors[my.cross_color_index];
  }

  adjust_brush_size(delta) {
    let my = this;
    if (delta > 0 || my.brush_size > 1) {
      my.brush_size += delta;
    }
    if (my.db_update) {
      let { brush_size } = my;
      dbase_queue_update({ brush_size });
    }
  }

  adjust_cross_size(delta) {
    let my = this;
    if (delta > 0 || my.cross_size > 1) {
      my.cross_size += delta;
    }
    if (my.db_update) {
      let { cross_size } = my;
      dbase_queue_update({ cross_size });
    }
  }

  clear() {
    let my = this;
    my.layer.clear();
    // my.init_xy();
  }
}
