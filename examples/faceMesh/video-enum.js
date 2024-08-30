//

let flipH = true;
// let video;

// Create the webcam video and hide it
//
function video_init() {
  enum_mediaDevices({}, function () {
    let mediaDevice = my.mediaDevices[0];
    if (!mediaDevice) {
      console.log('video_init failed. my.mediaDevices.length', my.mediaDevices.length);
      return;
    }
    // my.video = createCapture(mediaDevice, { flipped: flipH });
    my.video = mediaDevice.capture;
    console.log('my.video.width, my.video.height', my.video.width, my.video.height);

    // !!@ default to 300 150
    my.video.size(640, 480);

    my.video.hide();

    console.log('my.video.width, my.video.height', my.video.width, my.video.height);

    video_maskInit();

    my.bars = new eff_bars({ width: my.video.width, height: my.video.height });

    my.input = my.video;
  });
}

function video_maskInit() {
  let { width, height } = my.video;
  my.videoMask = createGraphics(width, height);
  my.videoBuff = createGraphics(width, height);
}

// my.mediaDevices = [
//    { label, deviceId, capture, stream }]

// Optional: dim = { width, height} for capture size
//
function enum_mediaDevices(options, doneFunc) {
  my.mediaDevices = [];
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log('enumerateDevices() not supported.');
    return;
  }
  // List cameras and microphones.
  navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
      devices.forEach(function (device) {
        // console.log('device', device);
        // console.log(
        //   device.kind + ': ' + device.label + ' id=|' + device.deviceId + '|'
        // );
        if (device.kind == 'videoinput') {
          // console.log('media_enumdevice.deviceId=' + device.deviceId);
          console.log('media_enum label=' + device.label);
          let { label, deviceId } = device;
          if (!deviceId) {
            label = 'No-id-' + random();
          }
          my.mediaDevices.push({ label, deviceId });
        }
      });
      // console.log('a_mediaDevices', a_mediaDevices);
      create_mediaDevices(options, doneFunc);
    })
    .catch(function (err) {
      console.log(err.name + ': ' + err.message);
    });
}

function create_mediaDevices(options, doneFunc) {
  dim = options;
  for (let mediaDevice of my.mediaDevices) {
    init_device_capture(mediaDevice);
    // create_mediaDiv(mediaDevice, { live: 0 });
  }
  doneFunc();
  // ui_refresh();
  function init_device_capture(mediaDevice) {
    let vcap = {
      audio: true,
      video: {
        deviceId: { exact: mediaDevice.deviceId },
      },
      flipped: flipH,
    };
    if (dim && dim.width && dim.height) {
      vcap.video.width = { exact: dim.width };
      vcap.video.height = { exact: dim.height };
    }
    // console.log('create_mediaDevices dim', dim);
    // console.log('create_mediaDevices vcap', vcap);
    let capture = createCapture(vcap, function (stream) {
      mediaDevice.stream = stream;
      // livem_restore();
    });
    capture.elt.muted = true;
    mediaDevice.capture = capture;
  }
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
