// https://editor.p5js.org/jht9629-nyu/sketches/vP6sWN4Cu
// p5moExamples lobby

// expand circle size to fit as many circles in canvas as possible

let my = {};

// mo-vote/device/{uid}/vote
//    individual vote

function my_setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  // my.fireb_config = 'jht9629';
  my.fireb_config = 'jht1493';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.mo_app = 'mo-vote';
  my.nameDevice = '';
  //
  my.vote_count = 0;
}

function setup() {
  my_setup();

  // my.canvas = createCanvas(my.width, my.height);
  noCanvas();

  dbase_app_init({ completed: startup_completed });

  createButton('Vote Up').mousePressed(voteUp);
  createButton('Vote Down').mousePressed(voteDown);
  my.vote_count_span = createSpan('' + my.vote_count);
}

function startup_completed() {
  console.log('startup_completed');
  dbase_event_observe({ changed_key_value });
}

function changed_key_value(key, value) {
  console.log('changed_key_value key', key, 'value', value);
}

function voteUp() {
  console.log('Vote Up');
}

function voteDown() {
  console.log('Vote Down');
}

function draw() {
  background(200);
  my.devices = dbase_device_summary();
  if (!my.devices) {
    console.log('no devices yet');
    return;
  }
  let ndevices = my.devices.length;
  if (ndevices != my.lastn) {
    console.log('ndevices', ndevices);
  }
  my.lastn = ndevices;
}
