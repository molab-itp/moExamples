// https://editor.p5js.org/jht9629-nyu/sketches/W_42_8Enr
// lit demo storage v3

// localStorage used to preserve settings
// Lit demo of UI input elements
// reference: https://lit.dev/tutorials/intro-to-lit/#8

// Button
// text input
// Slider
// checkbox
// radio button row
// selection
// color

let my = {};

function setup() {
  createCanvas(400, 100);

  // store new LitDemo html element
  // defined in lit-demo.js
  my.lit = createElement('lit-demo');
  my.lit.attribute('sliderValue', 50);
  my.lit.attribute('colorValue', '#8080FF');
  my.lit.attribute('shapeValue', 'triangle');

  // createElement('lit-demo');

  my.yoffset = 0;

  restoreStore();
}

function draw() {
  // background('#FF00FF');

  // use color picker value for the background color
  background(my.lit.elt.colorValue);

  // draw a rect shape in the middle of the canvas
  // that tracks the slider value from left to right
  let len = 50 + my.lit.elt._counter;
  let x = (my.lit.elt.sliderValue / 100) * width;
  let y = (height - len) / 2;
  if (my.lit.elt.checkBoxValue) {
    my.yoffset = (my.yoffset + 1) % height;
    y = my.yoffset;
  }

  fill(my.lit.elt.radioValue);

  let shape = my.lit.elt.shapeValue;
  if (shape == 'rect') {
    rect(x - len / 2, y, len, len);
  } else if (shape == 'circle') {
    circle(x, y + len / 2, len);
  } else {
    draw_triangle(x, y, len);
  }

  storeUpdateCheck();
}

function draw_triangle(x, y, len) {
  let x1 = x - len;
  let y1 = y + len;
  let x2 = x + len;
  let y2 = y1;
  let x3 = x;
  let y3 = y;
  triangle(x1, y1, x2, y2, x3, y3);
}

// https://lit.dev/tutorials/intro-to-lit/#8

// https://editor.p5js.org/jht9629-nyu/sketches/Ne1xB_wOz
// lit try v2

// https://editor.p5js.org/jht9629-nyu/sketches/AwB8tHJ15
// test drive DOM.js v11 inputs

// https://lit.dev/learn/#filter=tutorial

// https://lit.dev/tutorials/reactivity/#7
// click to animate
// https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
// https://codepen.io/rachelnabors/pen/rxpmJL/?editors=0010
//  Down the Rabbit Hole (with Web Animations API)
// https://scroll-driven-animations.style/tools/view-timeline/ranges/#range-start-name=cover&range-start-percentage=0&range-end-name=cover&range-end-percentage=100&view-timeline-axis=block&view-timeline-inset=0&subject-size=smaller&subject-animation=reveal&interactivity=clicktodrag&show-areas=yes&show-fromto=yes&show-labels=yes
// Also check out the View Timeline Ranges Visualizer, which shows exactly what the different values mean in an easy visual format.

// https://editor.p5js.org/jht9629-nyu/sketches/HureJsyBs
// lit demo v3
