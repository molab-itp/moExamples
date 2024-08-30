//
function my_init() {
  // updated to verify change on mobile
  my.version = '?v=93';
  my.isRemote = 1;
  // show detailed log
  my.logLoud = 1;

  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-facemesh';
  my.roomName = 'room0';
  my.group = 'group1';

  my.photo_index = 0;
  my.photo_max = 4;
  my.photo_list = [];

  let scale = 0.5;
  // let scale = 1.0;
  my.vwidth = 480 * scale;
  my.vheight = 640 * scale;
  my.top_percent = 80;

  // my.imageQuality = 1;
  my.imageQuality = 0.5;
  my.imageExt = '.jpg';
  my.thumbWidth = my.vwidth;

  my.query = get_url_params();
  if (my.query) {
    my.roomName = my.query.room || my.roomName;
    my.group = my.query.group || my.group;
    my.isRemote = parseFloat(my.query.remote || my.isRemote);
    my.photo_max = parseFloat(my.query.photo_max || my.photo_max);
    my.top_percent = parseFloat(my.query.top_percent || my.top_percent);
  }
}
