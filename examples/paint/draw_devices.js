//

function draw_devices() {
  if (layout_needed_check()) {
    console.log('draw_devices layout_needed_check n', my.devices.length);
    build_brushes();
  }
  draw_brushes();
}

function draw_brushes() {
  // Draw brushes in my.devices order
  // Reconsile brush properties
  // cross_x0, //
  // cross_y0,
  // cross_size,
  // cross_color_index,
  // brush_x0,
  // brush_y0,
  // brush_size,
  // brush_color_index,
  // for (let device of my.devices) {
  //   let brush = my.brushes[device.uid];
  //   brush.render_cross();
  //   image(brush.layer, brush.layout.x0, brush.layout.y0);
  // }
  for (let uid in my.brushes) {
    let brush = my.brushes[uid];
    // console.log('draw_brushes brush', brush);
    // brush.render_cross();
    // image(brush.layer, brush.layout.x0, brush.layout.y0);
  }
}

function build_brushes() {
  let layouts = layout_devices();
  my.brushes = {};
  for (let layout of layouts) {
    // console.log('build_brushes layout', layout);

    // layout = { device, x0: x, y0: y }
    let brush = new Brush({ width: my.xlen, height: my.ylen, layout });

    my.brushes[layout.device.uid] = brush;
  }
}

function layout_needed_check() {
  let ndevices = my.devices.length;
  if (ndevices != my.lastn) {
    console.log('layout_needed_check new ndevices', ndevices);
    my.lastn = ndevices;
    return 1;
  }
  return 0;
}

// returns: [ { device, x0: x, y0: y }, ... ]
//
function layout_devices() {
  my.ndiv = 1;
  let ndevices = my.devices.length;
  let more;
  let layouts;
  do {
    more = 0;
    my.xlen = width / my.ndiv;
    my.ylen = my.xlen * (16 / 9);
    let xhalf = my.xlen * 0.5;
    let yhalf = my.ylen * 0.5;
    let x0 = 0;
    let x = x0;
    let y = 0;
    layouts = [];
    for (let index = 0; index < ndevices; index++) {
      let device = my.devices[index];
      if (!device) {
        console.log('layout_devices no device', index, device);
        return;
      }
      layouts.push({ x0: x, y0: y, device });
      // console.log('layout_devices x', x, 'y', y, 'uid', device.uid);
      if (index != ndevices - 1) {
        x += my.xlen;
      }
      if (x + xhalf > width) {
        x = x0;
        y += my.ylen;
        if (y + yhalf > height) {
          my.ndiv += 1;
          more = 1;
          // console.log('layout_devices more', more, 'index', index);
          break;
        }
      }
    }
    // console.log('layout_devices more', more);
  } while (more);
  return layouts;
}
