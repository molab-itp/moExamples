// https://editor.p5js.org/jht9629-nyu/sketches/xxxx
// lobby

let my = {};

// dstore_device_summary()[0].uid
// dstore_device_summary()[0].serverValues.date_s
// dstore_device_summary()[0].serverValues.visit_count
// dstore_device_summary()[0].serverValues.userAgent

function my_setup() {
  my.width = 400;
  my.height = 300;
  // updated to verify change on mobile
  my.version = '?v=157';
  // Aspect ratio of video capture
  my.dstore_rootPath = 'm0-@r-@w-';
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
  let ds = dstore_device_summary();
  if (!ds) return;
  let n = ds.length;
  let len = int(width / n);
  let y = int(len / 2);
  fill(0);
  for (let x = 0; x < width; x += len) {
    circle(x + len / 2, y, len);
  }
}

// dstore_device_remove()
