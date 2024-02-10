// https://editor.p5js.org/jht9629-nyu/sketches/xxxx
// lobby
let my = {};

// my.stored_devices
// dstore_device_summary()

function my_setup() {
  my.width = 400;
  my.height = 300;
  // updated to verify change on mobile
  my.version = '?v=157';
  // Aspect ratio of video capture
  my.dstore_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.nameDevice = '';
}

function setup() {
  my_setup();

  my.canvas = createCanvas(my.width, my.height);

  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
  console.log('config.projectId', config.projectId, 'configLabel', config.configLabel);
  console.log('config.configVersion', config.configVersion, 'room', my.roomName);

  dstore_init();
}

function dstore_init() {
  let { signInAnonymously, auth } = fb_;
  signInAnonymously(auth)
    .then(() => {
      my.uid = auth.currentUser.uid;
      console.log('dstore_init my.uid', my.uid);

      dstore_device_onChild();
    })
    .catch((error) => {
      console.log('dstore_init error', error);
    });
}

function draw() {
  //
}

// dstore_device_remove()
