// https://editor.p5js.org/jht9629-nyu/sketches/vP6sWN4Cu
// p5moExamples lobby

// expand circle size to fit as many circles in canvas as possible

let my = {};

function my_setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  // my.fireb_config = my_firebaseConfig;
  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-blackfacts';
  // my.mo_app = 'mo-videoplayer';
  my.nameDevice = '';
  my.ndiv = 1;

  my.query = get_url_params();

  my.roomName = 'room0';
  if (my.query) {
    my.roomName = my.query.room || my.roomName;
    my.mo_app = my.query.app || my.mo_app;
  }

  // textSize(80);
}

// Your web app's Firebase configuration
const my_firebaseConfig = {
  apiKey: 'AIzaSyBg2bnuULvLvkd6SOAEetErgNtyGsNIb8c',
  authDomain: 'jhtitp-2417a.firebaseapp.com',
  projectId: 'jhtitp-2417a',
  storageBucket: 'jhtitp-2417a.appspot.com',
  messagingSenderId: '523385422249',
  appId: '1:523385422249:web:52df2a4c0803b79c2a04b8',
};

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);

  // dbase_app_init({});
  dbase_app_init({ completed: startup_completed });
}

function startup_completed() {
  //
  // dbase_app_observe({ observed_item });
  dbase_devices_observe({ observed_item, all: 1 });

  function observed_item(device) {
    console.log('observed_item device', device);
  }
}

function draw() {
  background(200);
  draw_devices();

  let n = my.app_devices.length;
  draw_number('n=', n, 20);
}

function draw_number(prefix, n) {
  // Convert number to string
  let str = prefix + ' ' + (n + '').padStart(2, '0');
  let x = 10;
  let y = my.height;
  // textSize(sz);
  // Draw black rect background
  let a = textAscent();
  let d = textDescent();
  let h = a + d;
  let w = textWidth(str);
  fill(0);
  rect(x, y - h, w, h);
  // rect(x, 0, w, my.height);

  // Draw white text
  fill(255);
  // x  y bottom-left corner.
  text(str, x, y - d);
}

function draw_devices() {
  // my.app_devices = dbase_site_devices();
  let devices = dbase_a_devices();
  my.app_devices = [];
  if (!devices) return;
  let ndevices = devices.length;
  if (ndevices != my.last_ndevices) {
    console.log('ndevices', ndevices);
    my.ndiv = 1;
  }
  my.last_ndevices = ndevices;
  my.len = width / my.ndiv;
  my.half = my.len / 2;
  my.dotLen = my.len / 3;
  let x0 = my.half;
  let y = my.half;
  let x = x0;
  for (let index = 0; index < ndevices; index++) {
    let last = index == ndevices - 1;
    let device = devices[index];
    let adevice = dbase_site_device_for_uid(device.uid);
    my.app_devices.push(adevice);
    draw_device(adevice, x, y);
    if (!last) {
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

function draw_device(adevice, x, y) {
  // let last = device.index == my.app_devices.length - 1;
  // let last = index == my.app_devices.length - 1;
  let last;
  // Black big circle
  fill(0);
  circle(x, y, my.len);
  // inner green dot marks active device
  if (dbase_site_isActive(adevice)) {
    fill('green');
    circle(x, y, my.dotLen);
  }
  // inner yellow dot marks my device
  if (adevice.uid == my.uid) {
    fill([187, 165, 61]);
    circle(x, y, my.dotLen);
  }
  if (last) {
    fill('red');
    circle(x, y, my.dotLen * 0.5);
  }
  fill(255);
  // let n = device.index + 1;
  let n = adevice.index + 1;
  text(n + '', x, y);
}

function downloadAction() {
  if (!my.app_devices) return;
  let str = JSON.stringify(my.app_devices, undefined, 2);
  downloadToFile('lobby-' + my.mo_app + '-live' + '.json', str);
  downloadActionShort();
}

function downloadActionShort() {
  //
  // remove arrays to short display of summary
  //
  for (let device of my.app_devices) {
    delete device.dbase.update;
    delete device.dbase.visit;
  }
  let str = JSON.stringify(my.app_devices, undefined, 2);
  downloadToFile('lobby-' + my.mo_app + '-live-short' + '.json', str);
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
