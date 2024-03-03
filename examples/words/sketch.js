// https://editor.p5js.org/jht9629-nyu/sketches/xxxx
// p5moExamples words

// overlay qrcode on a website
// [] convert to vanilla js
// [] action example

let my = {};

// mo-words/device/{uid}/word
//    individual word

function my_setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.mo_app = 'mo-words';
  my.nameDevice = '';
  //
  my.word_count = 0;
  my.word_total_count = 0;
  my.device_values = {};
}

function setup() {
  my_setup();

  create_my_iframe();

  // my.canvas = createCanvas(my.width, my.height);
  noCanvas();

  dbase_app_init({ completed: startup_completed });

  createButton('Word Up').mousePressed(wordUp);
  createButton('Word Down').mousePressed(wordDown);
  my.word_count_span = createSpan('' + my.word_count);
  createElement('br');
  createSpan('Total Word ');
  my.word_total_count_span = createSpan('' + my.word_total_count);

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
  calc_words();
  //
  my.word_count_span.html(my.word_count);
  my.word_total_count_span.html(my.word_total_count);
}

function startup_completed() {
  console.log('startup_completed');

  dbase_devices_observe({ observed_item, all: 1 });

  function observed_item(device) {
    console.log('observed_item device', device);
    if (device.word_count != undefined) {
      my.word_count = device.word_count;
    }
  }
}

function wordUp() {
  console.log('Vote Up');
  dbase_update_props({ word_count: dbase_increment(1) });
}

function wordDown() {
  console.log('Vote Down');
  dbase_update_props({ word_count: dbase_increment(-1) });
}

function calc_words() {
  my.word_total_count = 0;
  let a_devices = dbase_a_devices();
  for (let device of a_devices) {
    // let device = my.device_values[uid];
    if (device.word_count != undefined) {
      my.word_total_count += device.word_count;
    }
  }
}

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
