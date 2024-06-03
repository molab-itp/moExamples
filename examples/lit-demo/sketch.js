// https://editor.p5js.org/jht9629-nyu/sketches/HureJsyBs
// lit demo v3

// demo of Lit html inputs
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

  // createElement('todo-list');

  my.lit = createElement('lit-demo');

  // createElement('todo-list');
}

function draw() {
  // background('#FF00FF');
  background(my.lit.elt._colorValue);

  let len = 50;
  let x = (my.lit.elt._sliderValue / 100) * width;
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
