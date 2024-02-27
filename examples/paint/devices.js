//
function startup_completed() {
  console.log('startup_completed');

  dbase_a_devices_observe({ observed_a_devices });

  pingAction();

  init_brush();

  function observed_a_devices(key) {
    // console.log('build_devices key', key, 'uid', my.uid, 'brush', my.brush);
    if (my.isController && my.brush && key == my.uid) {
      // console.log('build_devices key', key, 'uid', my.uid, 'brush', my.brush);
      my.brush.sync(my.uid);
    }
  }
}

// !!@ Doc
// dbase_device_updates({ controller });
// function device_uid_isActive(uid) {
//   return dbase_device_isActive(fdevice) && fdevice.dbase.controller;

function pingAction() {
  let controller = my.isController ? 1 : 0;
  dbase_device_updates({ controller });
}
