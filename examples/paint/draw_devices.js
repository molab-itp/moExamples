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
}

function build_brushes() {
  layout_devices();
  my.brushes = {};
  for (let device of my.devices) {
    console.log('draw_devices device', device);

    let brush = new Brush({ width: my.xlen, height: my.ylen });

    let uid = device.uid;
    brush.device_uid = uid;
    brush.layout_x0 = device.layout_x0;
    brush.layout_y0 = device.layout_y0;

    my.brushes[uid] = brush;
  }
}

function layout_needed_check() {
  // my.devices = dbase_device_summary();
  if (!my.devices) {
    console.log('layout_needed_check no devices', my.devices);
    return 0;
  }
  let ndevices = my.devices.length;
  if (ndevices != my.lastn) {
    console.log('layout_needed_check new ndevices', ndevices);
    my.lastn = ndevices;
    return 1;
  }
  return 0;
}

// device.x0 = x;
// device.y0 = y;
//
function layout_devices() {
  my.ndiv = 1;
  let ndevices = my.devices.length;
  let more;
  do {
    more = 0;
    my.xlen = width / my.ndiv;
    my.ylen = my.xlen * (16 / 9);
    let x0 = 0;
    let x = x0;
    let y = 0;
    for (let index = 0; index < ndevices; index++) {
      let device = my.devices[index];
      if (!device) {
        console.log('layout_devices no device', index, device);
        return;
      }
      device.layout_x0 = x;
      device.layout_y0 = y;
      if (index != ndevices - 1) {
        x += my.xlen;
      }
      if (x > width) {
        x = x0;
        y += my.ylen;
        if (y > height) {
          my.ndiv += 1;
          more = 1;
          console.log('layout_devices more', more, 'index', index);
          break;
        }
      }
    }
    console.log('layout_devices more', more);
  } while (more);
}
