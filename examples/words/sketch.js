// https://editor.p5js.org/jht9629-nyu/sketches/xxxx
// p5moExamples words

// overlay qrcode on a website
// [] convert to vanilla js
// [] action example

let my = {};

// mo-words/device/{uid}/vote
//    individual vote

function my_setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  // my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.mo_app = 'mo-words';
  my.nameDevice = '';
  //
  my.vote_count = 0;
  my.vote_total_count = 0;
  my.device_values = {};
}

function setup() {
  my_setup();

  create_my_iframe();

  // my.canvas = createCanvas(my.width, my.height);
  noCanvas();

  dbase_app_init({ completed: startup_completed });

  createButton('Vote Up').mousePressed(voteUp);
  createButton('Vote Down').mousePressed(voteDown);
  my.vote_count_span = createSpan('' + my.vote_count);
  createElement('br');
  createSpan('Total Vote ');
  my.vote_total_count_span = createSpan('' + my.vote_total_count);

  // Move the canvas below all the ui elements
  let body_elt = document.querySelector('body');
  let other_elt = my.iframe_element.elt;
  body_elt.insertBefore(other_elt, null);
}

function create_my_iframe() {
  my.iframe_element = createElement('iframe');
  my.iframe_element.elt.src = 'https://www.merriam-webster.com/word-of-the-day/2023-01-01';
  my.iframe_element.elt.width = windowWidth;
  my.iframe_element.elt.height = windowHeight;
}

function draw() {
  background(200);
  //
  calc_votes();
  //
  my.vote_count_span.html(my.vote_count);
  my.vote_total_count_span.html(my.vote_total_count);
}

function startup_completed() {
  console.log('startup_completed');
  // dbase_event_observe({ changed_key_value, removed_key_value });
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

/*

https://www.merriam-webster.com/word-of-the-day/2023-01-01
Annus mirabilis means “a remarkable or notable year.”

https://www.merriam-webster.com/word-of-the-day/2024-01-01
Incipient is used to describe things which are 
beginning to come into being 
or which are to become apparent.

https://www.w3schools.com/tags/tag_iframe.ASP


my.iframe_element.elt.src = 'https://www.merriam-webster.com/word-of-the-day/2023-01-01'

*/
