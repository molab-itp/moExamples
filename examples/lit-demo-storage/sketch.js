// https://editor.p5js.org/jht9629-nyu/sketches/HureJsyBs
// lit demo v3

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
  my.lit.attribute('sliderValue', 10);
  my.lit.attribute('colorValue', '#FF0000');

  // createElement('todo-list');

  // createElement('lit-demo');
}

function draw() {
  // background('#FF00FF');

  // use color picker value for the background color
  background(my.lit.elt.colorValue);

  // draw a rect shape in the middle of the canvas
  // that tracks the slider value from left to right
  let len = 50;
  let x = (my.lit.elt.sliderValue / 100) * width;
  let y = (height - len) / 2;

  rect(x - len / 2, y, len, len);
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
