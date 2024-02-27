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
  // my.fireb_config = 'jht1493';
  my.fireb_config = my_firebaseConfig;
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.mo_app = 'mo-paint';
  my.nameDevice = '';
  my.isController = my.height > my.width;
  my.spawn_count = 0;
  my.cross_limit = 0.2;
}

// Your web app's Firebase configuration
const my_firebaseConfig = {
  apiKey: 'AIzaSyBg2bnuULvLvkd6SOAEetErgNtyGsNIb8c',
  authDomain: 'jhtitp-2417a.firebaseapp.com',
  projectId: 'jhtitp-2417a',
  storageBucket: 'jhtitp-2417a.appspot.com',
  messagingSenderId: '523385422249',
  appId: '1:523385422249:web:52df2a4c0803b79c2a04b8',
};
