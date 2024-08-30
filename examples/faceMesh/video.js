//

let flipH = true;
// let video;

// Create the webcam video and hide it
//
function video_init() {
  // Use default video size
  my.video = createCapture({ video: true }, { flipped: flipH });
  // my.video = createCapture(VIDEO, { flipped: flipH });
  // my.video.size(640, 480);
  // video.size(1920, 1080);
  my.video.hide();

  video_maskInit();
}

function video_maskInit() {
  let { width, height } = my.video;
  my.videoMask = createGraphics(width, height);
  my.videoBuff = createGraphics(width, height);
}

function overlayEyesMouth() {
  if (!my.face1) return;

  draw_shape_layer(my.face1, my.videoMask);
  my.video.mask(my.videoMask);

  let { x: x0, y: y0 } = faceMesh_outputPtToInput({ x: 0, y: 0 });
  my.videoBuff.clear();
  my.videoBuff.image(my.video, 0, 0, my.xlen, my.ylen, x0, y0, my.xlen, my.ylen);

  // image(my.videoBuff, 0, 0);

  let w = my.xlen * my.rx;
  let h = my.ylen * my.ry;
  image(my.videoBuff, 0, 0, w, h, 0, 0, my.xlen, my.ylen);

  // console.log('x0, y0, w, h', x0, y0, w, h);
}

function overlayEyesMouthBars() {
  if (!my.face1) return;

  draw_shape_layer(my.face1, my.videoMask);
  my.bars.prepareOutput();
  let out = my.bars.output.get();
  out.mask(my.videoMask);

  let { x: x0, y: y0 } = faceMesh_outputPtToInput({ x: 0, y: 0 });
  my.videoBuff.clear();
  my.videoBuff.image(out, 0, 0, my.xlen, my.ylen, x0, y0, my.xlen, my.ylen);

  // image(my.videoBuff, 0, 0);

  let w = my.xlen * my.rx;
  let h = my.ylen * my.ry;
  image(my.videoBuff, 0, 0, w, h, 0, 0, my.xlen, my.ylen);

  // console.log('x0, y0, w, h', x0, y0, w, h);
}

// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight]
