//
function my_init() {
  // updated to verify change on mobile
  my.version = '?v=88';
  my.isRemote = 1;
  my.videoFlag = 1;
  // show detailed log
  my.logLoud = 1;

  // Aspect ratio of video capture on mobile device
  let scale = 0.5;
  my.vwidth = 480 * scale;
  my.vheight = 640 * scale;
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-photo';
  my.roomName = 'room1';
  my.group = 'group1';

  // my.nameDevice = '';
  my.query = get_url_params();
  if (my.query) {
    my.roomName = my.query.room || my.roomName;
    my.group = my.query.group || my.group;
  }

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
