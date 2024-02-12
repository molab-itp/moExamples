// https://editor.p5js.org/jht9629-nyu/sketches/vP6sWN4Cu
// p5moExamples lobby

// expand circle size to fit as many circles in canvas as possible

let my = {};

// my.devices.length
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
  my.ndiv = 1;
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);

  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  console.log('config.projectId', config.projectId);
  console.log('configLabel', config.configLabel);
  console.log('configVersion', config.configVersion, 'room', my.roomName);

  dstore_init({ dstore_host_init });
}

function dstore_host_init() {
  console.log('dstore_host_init');
}

function draw() {
  background(200);
  my.devices = dstore_device_summary();
  if (!my.devices) return;
  let ndevices = my.devices.length;
  if (ndevices != my.lastn) {
    my.ndiv = 1;
  }
  my.lastn = ndevices;
  let len = width / my.ndiv;
  let half = len / 2;
  let x0 = half;
  let y = half;
  let x = x0;
  for (let index = 0; index < ndevices; index++) {
    let device = my.devices[index];
    let colr = 0;
    // green circle marks active device
    if (device && dstore_device_isActive(device)) {
      colr = 'green';
    }
    fill(colr);
    circle(x, y, len);
    // yellow inner dot marks my device
    if (device && device.uid == my.uid) {
      fill('yellow');
      circle(x, y, len / 3);
    }
    if (index != ndevices - 1) {
      x += len;
    }
    if (x > width) {
      x = x0;
      y += len;
      if (y + half > height) {
        my.ndiv += 1;
        break;
      }
    }
  }
}
