//

let flipH = true;
// let video;

// Create the webcam video and hide it
//
function video_init() {
  // !!@ prefer to use default video capture size,
  // but when size is not specified must set
  // Use default video size
  // my.video = createCapture({ video: true, audio: false, flipped: flipH });

  my.video = createCapture(VIDEO, { flipped: flipH });
  console.log('my.video.width, my.video.height', my.video.width, my.video.height);

  // !!@ remove when we can used default size
  let vwidth = 640;
  let vheight = 480;
  if (width < height) {
    vwidth = 480;
    vheight = 640;
  }
  // my.video.size(vwidth, vheight);
  // video.size(1920, 1080);
  my.video.hide();

  console.log('my.video.width, my.video.height', my.video.width, my.video.height);
  console.log('my.video.loadedmetadata', my.video.loadedmetadata);

  video_maskInit();

  my.bars = new eff_bars({ width: my.video.width, height: my.video.height });

  my.input = my.video;
}

function video_maskInit() {
  let { width, height } = my.video;
  my.videoMask = createGraphics(width, height);
  my.videoBuff = createGraphics(width, height);
}

function overlayEyesMouth() {
  overlayEyesMouthFace(my.face1, my.video);
}

function overlayEyesMouthBars() {
  my.bars.prepareOutput();
  let source = my.bars.output.get();
  overlayEyesMouthFace(my.face1, source);
}

function overlayEyesMouthFace(face, source) {
  if (!face) return;

  draw_shape_layer(face, my.videoMask);
  source.mask(my.videoMask);

  let xlen = my.videoBuff.width;
  let ylen = my.videoBuff.height;
  let { x: x0, y: y0 } = faceMesh_outputPtToInput({ x: 0, y: 0 });
  my.videoBuff.clear();
  my.videoBuff.image(source, 0, 0, xlen, ylen, x0, y0, xlen, ylen);

  let w = xlen * my.rx;
  let h = ylen * my.ry;
  image(my.videoBuff, 0, 0, w, h, 0, 0, xlen, ylen);
  // console.log('x0, y0, w, h', x0, y0, w, h);
}

// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight]
