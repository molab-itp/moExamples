// https://editor.p5js.org/jht9629-nyu/sketches/vP6sWN4Cu
// p5moExamples lobby

let my = {};

// my.devices.length
// my.devices[0].uid
// my.devices[0].serverValues.date_s
// my.devices[0].serverValues.visit_count
// my.devices[0].serverValues.userAgent

function my_setup() {
  my.width = 400;
  my.height = 300;
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'lobby';
  my.roomName = 'room0';
  my.nameDevice = '';
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);

  dbase_app_init({});
}

function draw() {
  background(200);
  my.devices = dbase_site_devices();
  if (!my.devices) return;
  let n = my.devices.length;
  let len = width / n;
  let y = len / 2;
  let x = len / 2;
  for (let index = 0; index < my.devices.length; index++) {
    let device = my.devices[index];
    let colr = 0;
    // green circle marks active device
    if (device && dbase_device_isActive(device)) {
      colr = 'green';
    }
    fill(colr);
    circle(x, y, len);
    // yellow inner dot marks my device
    if (device.uid == my.uid) {
      fill('yellow');
      circle(x, y, len / 3);
    }
    x += len;
    if (x > width) {
      x = 0;
      y += len;
    }
  }
}
