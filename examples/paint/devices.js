//
function startup_completed() {
  console.log('startup_completed');

  dbase_a_devices_observe({ observed_a_device, removed_a_device });

  pingAction();

  init_brush();

  function observed_a_device(key, device) {
    // console.log('build_devices key', key, 'uid', my.uid, 'brush', my.brush);
    // console.log('build_devices observed key', key, 'uid', my.uid, 'device', device);
    if (my.isRemote && my.brush && key == my.uid) {
      my.brush.sync(device);
    } else if (my.brushes) {
      let brush = my.brushes[key];
      if (!brush) {
        console.log('build_devices key', key, 'uid', my.uid, 'brush', my.brush);
        return;
      }
      // console.log('build_devices sync key', key, 'brush', brush);
      brush.sync(device);
    }
  }

  function removed_a_device(key) {
    console.log('build_devices removed key', key, 'uid', my.uid, 'brush', my.brush);
    if (my.brushes) {
      delete my.brushes[key];
    }
  }
}

// !!@ Doc

function pingAction() {
  let remote = my.isRemote ? 1 : 0;
  dbase_device_updates({ remote });
}
