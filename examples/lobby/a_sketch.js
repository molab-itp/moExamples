// https://editor.p5js.org/jht9629-nyu/sketches/vP6sWN4Cu
// p5moExamples lobby

let my = {};

// my.devices[0].uid
// my.devices[0].serverValues.date_s
// my.devices[0].serverValues.visit_count
// my.devices[0].serverValues.userAgent

function my_setup() {
  my.width = 400;
  my.height = 300;
  my.dstore_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-blackfacts';
  my.roomName = 'room0';
  my.nameDevice = '';
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);

  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  console.log('config.projectId', config.projectId, 'configLabel', config.configLabel);
  console.log('config.configVersion', config.configVersion, 'room', my.roomName);

  dstore_init({ dstore_host_init });
}

function dstore_host_init() {
  console.log('dstore_host_init');
}

function draw() {
  background(200);
  my.devices = dstore_device_summary();
  if (!my.devices) return;
  let n = my.devices.length;
  // let len = int(width / n);
  // let len = int(width / n);
  let len = width / n;
  let y = int(len / 2);
  let x = 0;
  for (let index = 0; index < my.devices.length; index++) {
    let device = my.devices[index];
    let colr = 0;
    // green circle marks active device
    if (device && dstore_device_isActive(device)) {
      colr = 'green';
    }
    fill(colr);
    circle(x + len / 2, y, len);
    // yellow inner dot marks my device
    if (device.uid == my.uid) {
      fill('yellow');
      circle(x + len / 2, y, len / 2);
    }
    x += len;
    if (x > width) {
      x = 0;
      y += len;
    }
  }
}
