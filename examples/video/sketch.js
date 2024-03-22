// p5LiveVideo example dashboard
// https://github.com/jht1493/p5videoKit
//
let videoKit; // home for library routines

p5.disableFriendlyErrors = true; // disables FES to improve performance

function setup() {
  // Report startup time for debugging
  let lapse = window.performance.now() - a_start_now;
  console.log('setup lapse', lapse);
  // indicate how long it took to load everything

  // Lowest pixel density for performance
  pixelDensity(1);

  // Need some starting dimensions for canvas.
  // Make it small, size will get adjusted by UI (user interface) later in startup
  createCanvas(100, 100);

  // must call createCanvas before new p5videoKit

  videoKit = new p5videoKit(a_config);
}

function draw() {
  videoKit.draw();
}

let a_config = {
  // hide_ui: 1,
  // effects for import, will appear at top of the effect menu
  // an EFFECT can have many PROPERTIES specific to the effect
  // for example canvas size, color, cell size,
  // to see this, choose "circle" in Effect1 and Effect2,
  // then choose different properties like number of circles per frame
  // or the video source
  // the "effects" array creates a pull-down menu
  // which offers a first selection of effects added to the VideoKit library,
  // you could add some more !!!!
  // effects: [
  // { label: 'a_slit_scan', import_path: 'effects/eff_a_slit_scan.js' },
  // ],
  // settings for import, will appear in the settings menu
  // SETTINGS will load a save .json file with predefined values
  // for all the settings associated with the effect
  // "settings" is an array of
  // settings: [
  // { label: 'videoKit', import_path: 'settings/videoKit.json' },
  // ],
};

// https://editor.p5js.org/shawn/sketches/jZQ64AMJc
// p5LiveMedia Test Video
// https://github.com/vanevery/p5LiveMedia
