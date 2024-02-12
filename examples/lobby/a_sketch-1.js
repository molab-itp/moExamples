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
  my.fb_config = 'jht9629';
  // my.fb_config = 'jht1493';
  my.dstore_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-blackfacts';
  my.roomName = 'room0';
  my.nameDevice = '';
  my.ndiv = 1;
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);

  let config = fb_.init(my.fb_config);
  console.log('configVersion', config.configVersion);
  console.log('config.projectId', config.projectId);
  console.log('configLabel', config.configLabel);
  console.log('room', my.roomName);

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
  my.len = width / my.ndiv;
  my.half = my.len / 2;
  my.dotLen = my.len / 3;
  let x0 = my.half;
  let y = my.half;
  let x = x0;
  for (let index = 0; index < ndevices; index++) {
    let device = my.devices[index];
    draw_device(device, x, y);
    if (index != ndevices - 1) {
      x += my.len;
    }
    if (x > width) {
      x = x0;
      y += my.len;
      if (y + my.half > height) {
        my.ndiv += 1;
        break;
      }
    }
  }
}

function draw_device(device, x, y) {
  if (!device) return;
  let colr = 0;
  fill(colr);
  circle(x, y, my.len);
  // inner green dot marks active device
  if (dstore_device_isActive(device)) {
    fill('green');
    circle(x, y, my.dotLen);
  }
  // inner yellow dot marks my device
  if (device.uid == my.uid) {
    fill('yellow');
    circle(x, y, my.dotLen);
  }
}

function downloadAction() {
  if (!my.devices) return;
  let str = JSON.stringify(my.devices, undefined, 2);
  downloadToFile(my.mo_app + '-live' + '.json', str);
}

// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function downloadToFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// F5 to select chrome
// VS Code menu: Run > Start Debugging

// .vscode/launch.json
//       "url": "http://localhost:5500/p5moExamples/examples/lobby",

// https://stackoverflow.com/questions/46945784/how-to-debug-javascript-in-visual-studio-code-with-live-server-running
