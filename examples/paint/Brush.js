class Brush {
  //
  static colorGold = [187, 165, 61];
  // static colors = ['red', 'green', Brush.colorGold, 0];
  // static colors = [[255, 0, 0], [0, 255, 0], Brush.colorGold, 0];
  static colors = [[255, 0, 0], [0, 255, 0], Brush.colorGold];

  //
  // {  width, height }
  constructor(props) {
    Object.assign(this, props);
    let my = this;
    my.layer = createGraphics(my.width, my.height);
    my.brush_color_index = 0;
    my.cross_color_index = 0;
    my.hitEdge = 0;
    my.brush_size = 4;
    my.cross_size = 4;
    my.init_xy();
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
    {
      let { brush_x0, brush_y0 } = my;
      dbase_update_props({}, { brush_x0, brush_y0 });
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
    {
      let { cross_x0, cross_y0 } = my;
      dbase_update_props({}, { cross_x0, cross_y0 });
    }
  }

  render_cross() {
    let my = this;
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

    dbase_update_props({});
  }

  mouseDragged() {
    let my = this;
    let colr = Brush.colors[my.brush_color_index];
    my.layer.strokeWeight(my.brush_size);
    my.layer.stroke(colr);
    my.layer.line(pmouseX, pmouseY, mouseX, mouseY);
    my.init_brush(mouseX, mouseY);
  }

  trackBrush() {
    let my = this;
    let colr = Brush.colors[my.brush_color_index];
    my.layer.strokeWeight(my.brush_size);
    my.layer.stroke(colr);
    if (my.pmouseX != undefined) {
      my.layer.line(my.pmouseX, my.pmouseY, my.brush_x0, my.brush_y0);
    }
    my.pmouseX = my.brush_x0;
    my.pmouseY = my.brush_y0;
  }

  next_crossColor() {
    let my = this;
    my.cross_color_index = (my.cross_color_index + 1) % Brush.colors.length;
    update_brush(my);
  }

  next_brushColor() {
    let my = this;
    my.brush_color_index = (my.brush_color_index + 1) % Brush.colors.length;
    update_brush(my);
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
    {
      let { brush_size } = my;
      dbase_update_props({}, { brush_size });
    }
  }

  adjust_cross_size(delta) {
    let my = this;
    if (delta > 0 || my.cross_size > 1) {
      my.cross_size += delta;
    }
    {
      let { cross_size } = my;
      dbase_update_props({}, { cross_size });
    }
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
  }

  clear() {
    let my = this;
    my.layer.clear();
    my.init_xy();
  }
}
