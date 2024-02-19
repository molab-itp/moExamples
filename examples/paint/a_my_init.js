//
function my_init() {
  my.full_screen = 1;
  if (my.full_screen) {
    my.width = windowWidth;
    // Leave room at bottom for buttons
    my.height = windowHeight - 60;
  } else {
    my.width = 200;
    my.height = 200;
  }
  //
  // my.fireb_config = 'jht9629';
  my.fireb_config = 'jht1493';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.mo_app = 'mo-paint';
  my.nameDevice = '';
  //
  my.device_values = {};
  //
  my.clear_action = 0;
  //
  my.isPortraitView = window.innerHeight > window.innerWidth;
}
