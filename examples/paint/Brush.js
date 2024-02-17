class Brush {
  //
  static colorGold = [187, 165, 61];
  static colors = ['red', 'green', Brush.colorGold, 0];

  //
  // {  width, height }
  constructor(props) {
    Object.assign(this, props);
    let my = this;
    my.layer = createGraphics(my.width, my.height);
    my.color_index = 0;
    my.hitEdge = 0;
    my.brush_size = 4;
    let x = my.width * 0.5;
    let y = my.height * 0.5;
    my.init(x, y);
  }

  init(x, y) {
    let my = this;
    my.x0 = x;
    my.y0 = y;
    my.xLeft = my.x0;
    my.yTop = my.y0;
    my.xRight = my.x0;
    my.yBottom = my.y0;
  }

  render() {
    let my = this;
    my.xRight += 1;
    if (my.xRight > my.width) {
      my.hitEdge += 1;
      my.xRight = my.x0;
    }
    my.layer.strokeWeight(my.brush_size);
    my.layer.stroke(my.lineColor(0));
    my.layer.line(my.x0, my.y0, my.xRight, my.y0);

    my.yBottom += 1;
    if (my.yBottom > my.height) {
      my.hitEdge += 1;
      my.yBottom = my.y0;
    }
    my.layer.stroke(my.lineColor(1));
    my.layer.line(my.x0, my.y0, my.x0, my.yBottom);

    my.xLeft -= 1;
    if (my.xLeft < 0) {
      my.hitEdge += 1;
      my.xLeft = my.x0;
    }
    my.layer.stroke(my.lineColor(2));
    my.layer.line(my.x0, my.y0, my.xLeft, my.y0);

    my.yTop -= 1;
    if (my.yTop < 0) {
      my.hitEdge += 1;
      my.yTop = my.y0;
    }
    my.layer.stroke(my.lineColor(3));
    my.layer.line(my.x0, my.y0, my.x0, my.yTop);

    if (my.hitEdge >= 4) {
      my.hitEdge = 0;
      my.next_lineColor();
    }
  }
  mouse_line() {
    let my = this;
    let colr = Brush.colors[my.color_index];
    my.layer.strokeWeight(my.brush_size);
    my.layer.stroke(colr);
    my.layer.line(pmouseX, pmouseY, mouseX, mouseY);
    my.init(mouseX, mouseY);
  }

  next_lineColor() {
    let my = this;
    my.color_index = (my.color_index + 1) % Brush.colors.length;
    update_brush(my);
  }

  lineColor() {
    let my = this;
    return Brush.colors[my.color_index];
  }

  adjust_size(delta) {
    let my = this;
    my.brush_size += delta;
  }
}
