// https://editor.p5js.org/jht9629-nyu/sketches/5VKqK34Ps
// p5moExamples photo booth 52

let my = {};

function setup() {
  //
  // Lowest pixel density for small uploads
  pixelDensity(1);

  my_init();

  my.canvas = createCanvas(my.width, my.height);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.canvas.touchEnded(canvas_mouseReleased);

  my.photo_count = 0;

  ui_init();

  video_create();

  dbase_app_init({ completed: startup_completed });

  // anim_init();

  my.x = 0;
  my.y = my.height / 2;
  my.xstep = 1;
  my.radius = int(my.width / 10);

  my.slit_scan = 1;
}

function startup_completed() {
  //
  dbase_devices_observe({ observed_key, observed_item, all: 1 });

  function observed_key(key, device) {
    // console.log('observed_a_device key', key, 'uid', my.uid, 'device', device);
    console.log('observed_key key', key, 'device.photo_count', device && device.photo_count);
  }

  function observed_item(device) {
    console.log('observed_item device.photo_count', device.photo_count);
    if (device.photo_count != undefined) {
      if (device.photo_count != my.photo_count) {
        show_action();
      }
      my.photo_count = device.photo_count;
    }
  }
}

function draw() {
  draw_frame();

  // ui_init_update();

  // my.animLoop.step({ action: updateAction });
}

function draw_frame() {
  if (my.videoFlag && !video_ready()) return;

  if (my.videoFlag) {
    // faster to get entire video frame as an image
    my.videoImg = my.video.get();
  }

  if (my.slit_scan) {
    //
    my.videoImg.loadPixels();
    let w = my.videoImg.width;
    let h = my.videoImg.height;
    copy(my.videoImg, w / 2, 0, 1, h, my.x, 0, 1, h);
    //
  } else if (my.videoImg) {
    // background(0);
    image(my.videoImg, 0, 0);

    noStroke();
    fill(my.colors[my.photo_count % my.colors.length]);
    circle(my.x, my.y, my.radius);
  }
  my.x = (my.x + my.xstep) % my.width;

  my.photo_count_span.html(my.photo_count);
}

function canvas_mouseReleased() {
  // console.log('canvas_mouseReleased');
  track_xy();
}

function track_xy() {
  let x = mouseX;
  let y = mouseY;
}

function mouseDragged() {
  // console.log('mouseDragged');
  // required to prevent touch drag moving canvas on mobile
  let onCanvas = mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
  if (onCanvas) {
    track_xy();
  }
  // return my.scrollFlag ? true : !onCanvas;
  return !onCanvas;
}

function windowResized() {
  // console.log('windowResized windowHeight', windowHeight, 'windowWidth', windowWidth);
  // my.isPortrait = windowHeight > windowWidth;
  if (my.isRemote) {
    return;
  }
  resizeCanvas(windowWidth, windowHeight);
  // console.log('windowResized width', width, 'height', height);
}

// https://editor.p5js.org/jht9629-nyu/sketches/twgS6eWRZ
// pixel-grid

// https://editor.p5js.org/jht9629-nyu/sketches/7Wjlo3pPU
// mo-pix-chip-grid jht9629 fireb_firebase.js

// https://editor.p5js.org/jht9629-nyu/sketches/CntV1JQNp
// p5moExamples pixel-grid 47
