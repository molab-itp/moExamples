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
  my.video.size(vwidth, vheight);
  // video.size(1920, 1080);
  my.video.hide();

  console.log('my.video.width, my.video.height', my.video.width, my.video.height);

  video_maskInit();
}

function video_maskInit() {
  let { width, height } = my.video;
  my.videoMask = createGraphics(width, height);
  my.videoBuff = createGraphics(width, height);
}

// export let a_mediaDevices = [];

// mediaDevice
//  { label, deviceId, capture, stream }

function create_mediaDevices() {
  for (let mediaDevice of a_mediaDevices) {
    init_device_capture(mediaDevice);
    create_mediaDiv(mediaDevice, { live: 0 });
  }
  ui_refresh();

  function init_device_capture(mediaDevice) {
    let vcap = {
      audio: true,
      video: {
        deviceId: { exact: mediaDevice.deviceId },
      },
    };
    let dim = get_capture_size();
    if (dim && dim.width && dim.height) {
      vcap.video.width = { exact: dim.width };
      vcap.video.height = { exact: dim.height };
    }
    // console.log('create_mediaDevices dim', dim);
    console.log('create_mediaDevices vcap', vcap);
    let capture = createCapture(vcap, function (stream) {
      mediaDevice.stream = stream;
      livem_restore();
    });
    capture.elt.muted = true;
    mediaDevice.capture = capture;
  }
}

function media_enum() {
  a_mediaDevices = [];
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
          a_mediaDevices.push({ label, deviceId });
        }
      });
      // console.log('a_mediaDevices', a_mediaDevices);
      create_mediaDevices();
    })
    .catch(function (err) {
      console.log(err.name + ': ' + err.message);
    });
}

function overlayEyesMouth() {
  if (!my.face1) return;

  draw_shape_layer(my.face1, my.videoMask);
  my.video.mask(my.videoMask);

  let xlen = my.videoBuff.width;
  let ylen = my.videoBuff.height;
  let { x: x0, y: y0 } = faceMesh_outputPtToInput({ x: 0, y: 0 });
  my.videoBuff.clear();
  my.videoBuff.image(my.video, 0, 0, xlen, ylen, x0, y0, xlen, ylen);

  // image(my.videoBuff, 0, 0);

  let w = xlen * my.rx;
  let h = ylen * my.ry;
  image(my.videoBuff, 0, 0, w, h, 0, 0, xlen, ylen);

  // console.log('x0, y0, w, h', x0, y0, w, h);
}

function overlayEyesMouthBars() {
  if (!my.face1) return;

  draw_shape_layer(my.face1, my.videoMask);
  my.bars.prepareOutput();
  let out = my.bars.output.get();
  out.mask(my.videoMask);

  let xlen = my.videoBuff.width;
  let ylen = my.videoBuff.height;
  let { x: x0, y: y0 } = faceMesh_outputPtToInput({ x: 0, y: 0 });
  my.videoBuff.clear();
  my.videoBuff.image(out, 0, 0, xlen, ylen, x0, y0, xlen, ylen);

  // image(my.videoBuff, 0, 0);

  let w = xlen * my.rx;
  let h = ylen * my.ry;
  image(my.videoBuff, 0, 0, w, h, 0, 0, xlen, ylen);

  // console.log('x0, y0, w, h', x0, y0, w, h);
}

// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight]
