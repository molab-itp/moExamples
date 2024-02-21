// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote

// participants can cast a numeric vote up or down

let my = {};

// mo-vote/device/{uid}/vote
//    individual vote

function my_setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  // my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.mo_app = 'mo-vote';
  my.nameDevice = '';
  //
  my.vote_count = 0;
  my.vote_total_count = 0;
  my.device_values = {};
}

function setup() {
  my_setup();

  // my.canvas = createCanvas(my.width, my.height);
  noCanvas();

  dbase_app_init({ completed: startup_completed });

  createButton('Vote Up').mousePressed(voteUp);
  createButton('Vote Down').mousePressed(voteDown);
  my.vote_count_span = createSpan('' + my.vote_count);
  createElement('br');
  createSpan('Total Vote ');
  my.vote_total_count_span = createSpan('' + my.vote_total_count);
}

function draw() {
  background(200);
  //
  // if (!check_devices()) return;
  //
  calc_votes();
  //
  my.vote_count_span.html(my.vote_count);
  my.vote_total_count_span.html(my.vote_total_count);
}

function startup_completed() {
  console.log('startup_completed');
  // dbase_event_observe({ changed_key_value, removed_key_value });
  dbase_a_devices_observe({ observed_a_devices, all: 1 });

  function observed_a_devices(key) {
    console.log('observed_a_devices key', key, 'uid', my.uid);
    if (key == my.uid) {
      // console.log('build_devices key', key, 'uid', my.uid);
      let device = dbase_a_device_for_uid(my.uid);
      if (device && device.vote_count != undefined) {
        my.vote_count = device.vote_count;
      }
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
