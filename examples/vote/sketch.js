// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote

// participants can cast a numeric vote up or down

let my = {};

// mo-vote/device/{uid}/vote
//    individual vote

function my_setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  my.fireb_config = 'jht9629'; // change to your firebase app
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0'; // change to add a room in firebase real-time database
  my.mo_app = 'mo-vote';
  my.nameDevice = '';
  //
  my.vote_count = 0;
  my.vote_total_count = 0;
  my.device_values = {};
}

function setup() {
  my_setup(); // setup firebase configuration

  // my.canvas = createCanvas(my.width, my.height);
  noCanvas();

  dbase_app_init({ completed: startup_completed }); // callback function when app init

  createButton('Vote Up').mousePressed(voteUp); // call voteUp() when button press
  createButton('Vote Down').mousePressed(voteDown); // call voteDown() when button press
  my.vote_count_span = createSpan('' + my.vote_count); // create a span tag showing current user's vote count
  createElement('br');
  createSpan('Total Vote ');
  my.vote_total_count_span = createSpan('' + my.vote_total_count); // create a span tag showing real-time total vote count
}

function draw() {
  background(200);
  //
  calc_votes(); // calculate votes every frame
  //
  my.vote_count_span.html(my.vote_count); // show current user's vote every frame
  my.vote_total_count_span.html(my.vote_total_count); // show real-time total votes every frame
}

// check device exists in db
function startup_completed() {
  console.log('startup_completed');
  dbase_a_devices_observe({ observed_a_device, all: 1 });

  function observed_a_device(key, device) {
    console.log('observed_a_device key', key, 'uid', my.uid, 'device', device);
    if (key != my.uid || !device) return;
    // console.log('build_devices key', key, 'uid', my.uid);
    // if (!device) return;
    if (device.vote_count != undefined) {
      my.vote_count = device.vote_count;
    }
  }
}

function voteUp() {
  console.log('Vote Up');
  dbase_update_props({}, { vote_count: dbase_value_increment(1) });
}

function voteDown() {
  console.log('Vote Down');
  dbase_update_props({}, { vote_count: dbase_value_increment(-1) });
}

function calc_votes() {
  my.vote_total_count = 0;
  let a_devices = dbase_a_devices();
  for (let device of a_devices) {
    // let device = my.device_values[uid];
    if (device.vote_count != undefined) {
      my.vote_total_count += device.vote_count;
    }
  }
}

// F5 to select chrome
// VS Code menu: Run > Start Debugging

// .vscode/launch.json
//    "url": "http://localhost:5500/examples/vote/",

// https://stackoverflow.com/questions/46945784/how-to-debug-javascript-in-visual-studio-code-with-live-server-running
