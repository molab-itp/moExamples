//
function my_init() {
  // updated to verify change on mobile
  my.version = '?v=55';
  my.isRemote = 1;
  my.videoFlag = 1;
  my.logLoud = 0;

  my.imageQuality = 1;
  // my.imageQuality = 0.1;
  my.imageExt = '.jpg';
  // my.imageExt = '.png';
  my.thumbWidth = 256;

  // Aspect ratio of video capture on mobile device
  my.vwidth = 480;
  my.vheight = 640;
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-photo';
  my.roomName = 'room1';

  // my.nameDevice = '';

  if (my.isRemote) {
    my.width = my.vwidth;
    my.height = my.vheight;
  } else {
    my.width = windowWidth;
    my.height = windowHeight;
  }

  my.colorGold = [187, 165, 61];
  my.colors = [[255, 0, 0], [0, 255, 0], my.colorGold];
}
