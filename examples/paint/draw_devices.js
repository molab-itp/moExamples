//

function draw_devices() {
  if (layout_needed_check()) {
    console.log('draw_devices layout_needed_check n', my.devices.length);
    layout_devices();
    for (let device of my.devices) {
      console.log('draw_devices device', device);
      // device.brush = my.brush = new Brush({ width: my.xlen, height: my.ylen });
    }
  }
  // else {
  //   console.log('draw_devices NO layout_needed_check ');
  // }
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
