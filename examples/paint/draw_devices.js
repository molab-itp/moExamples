//

function draw_devices() {
  if (layout_needed_check()) {
    console.log('draw_devices layout_needed_check n', dbase_a_devices().length);
    build_brushes();
  }
  draw_brushes();
}

function draw_brushes() {
  //
  // Draw brushes in my.brushes
  //  sync brush properteis from db

  let status = {};
  for (let uid in my.brushes) {
    let brush = my.brushes[uid];
    // console.log('draw_brushes brush', brush);
    brush.sync();
    brush.prepare_layer(status);
    {
      // image(brush.layer, brush.layout.x0, brush.layout.y0);
      let img = brush.layer;
      let dx = brush.layout.x0;
      let dy = brush.layout.y0;
      let dWidth = my.xlen;
      let dHeight = my.ylen;
      let sx = 0;
      let sy = 0;
      image(img, dx, dy, dWidth, dHeight, sx, sy, img.width, img.height);
    }
  }
  if (status.cleared) {
    background(0);
  }
}

function build_brushes() {
  let layouts = layout_devices();
  my.brushes = {};
  for (let layout of layouts) {
    // console.log('build_brushes layout', layout);

    // layout = { device, x0: x, y0: y }
    let { width, height } = layout;
    let brush = new Brush({ width, height, layout });
    brush.sync();
    // Object.assign(brush, brush.layout.device);
    // Object.assign(brush, brush.device);

    my.brushes[layout.uid] = brush;
  }
}

function layout_needed_check() {
  let a_devices = dbase_a_devices();
  let ndevices = a_devices.length;
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
  let a_devices = dbase_a_devices();
  let ndevices = a_devices.length;
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
      let device = a_devices[index];
      if (!device) {
        console.log('layout_devices no device', index, device);
        return;
      }
      {
        let { uid, width, height } = device;
        layouts.push({ x0: x, y0: y, uid, width, height });
      }
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
