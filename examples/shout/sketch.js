// https://editor.p5js.org/jht9629-nyu/sketches/NEIgP4oAE
// p5moExamples shout 71

// a play list of websites show in an iframe

// [] loop, play next after n seconds

let my = {};

function my_setup() {
  my.playList = [
    'https://molab-itp.github.io/p5moLibrary/src/demo/mo-videoplayer/?playlist=DrI_8IFzkpw',
    'https://cheerful-ganache-f31c35.netlify.app/',
  ];
  my.playIndex = 0;
  my.width = windowWidth;
  my.height = windowHeight;
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room1';
  my.mo_app = 'mo-shout';
  my.nameDevice = '';

  my.iframe_src = my.playList[my.payIndex];
}

function setup() {
  my_setup();

  create_my_iframe();

  // my.canvas = createCanvas(my.width, my.height);
  noCanvas();

  dbase_app_init({ completed: startup_completed });

  createButton('Shout Up').mousePressed(playIndexUpAction);
  createButton('Shout Down').mousePressed(playIndexDownAction);
  createButton('Reset').mousePressed(playIndexFirst_action);
  createSpan(' playIndex ');
  my.playIndex_span = createSpan(my.playIndex);

  // Move the iframe below all the ui elements
  let body_elt = document.querySelector('body');
  let other_elt = my.iframe_element.elt;
  body_elt.insertBefore(other_elt, null);
}

function create_my_iframe() {
  my.iframe_element = createElement('iframe');
  my.iframe_element.elt.src = my.playList[my.playIndex];
  my.iframe_element.elt.width = windowWidth;
  my.iframe_element.elt.height = windowHeight;
}

function draw() {
  background(200);
  //
}

function startup_completed() {
  console.log('startup_completed');

  dbase_devices_observe({ observed_item, all: 1 });

  function observed_item(device) {
    console.log('observed_item device', device);
    if (device.playIndex != undefined) {
      set_playIndex(device.playIndex);
    }
  }
}

function set_playIndex(newValue) {
  console.log('set_playIndex my.playIndex', newValue);
  my.playIndex = newValue;
  my.playIndex_span.html(my.playIndex);
  my.iframe_element.elt.src = my.playList[my.playIndex];
}

function playIndexUpAction() {
  if (my.playIndex < my.playList.length - 1) {
    dbase_update_props({ playIndex: dbase_increment(1) });
  } else {
    dbase_update_props({ playIndex: 0 });
  }
}

function playIndexDownAction() {
  if (my.playIndex > 0) {
    dbase_update_props({ playIndex: dbase_increment(-1) });
  } else {
    dbase_update_props({ playIndex: my.playList.length - 1 });
  }
}

function playIndexFirst_action() {
  dbase_update_props({ playIndex: 0 });
}

// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote 47
