//
function startup_completed() {
  console.log('startup_completed');

  // 'mo-paint/device'
  dbase_event_observe(
    { changed_key_value, removed_key_value }, //
    { app: my.mo_app + '/device' }
  );

  pingAction();
}

function pingAction() {
  let controller = my.isPortraitView ? 1 : 0;
  dbase_device_updates({ controller });
}

// dbase_event_observe --> dbase_observe_devices
//

function changed_key_value(key, value) {
  // console.log('changed_key_value key', key, 'value', value);
  my.device_values[key] = value;
  build_devices(key);
}

function removed_key_value(key, value) {
  console.log('removed_key_value key', key, 'value', value);
  delete my.device_values[key];
  build_devices(key);
}

// Could be improve performance by knowing
// that only specific device is updated?
//
function build_devices(key) {
  // value = { uid: { count: xx, vote_count: nn}, ...}
  // my.device_values = value;
  //
  let allDevices = dbase_device_summary();
  let devices = [];
  for (let index = 0; index < allDevices.length; index++) {
    let adevice = allDevices[index];
    let uid = adevice.uid;
    let device = my.device_values[uid];
    if (device && device_uid_isActive(uid)) {
      device.uid = uid;
      // device.sortOrder = index;
      // console.log('build_devices device.uid', device.uid, 'sortOrder', device.sortOrder);
      // console.log('build_devices device.uid', device.uid, 'brush_x0', device.brush_x0);
      devices.push(device);
    }
  }

  my.devices = devices;

  // console.log('build_devices key', key, 'uid', my.uid, 'brush', my.brush);
  if (my.isPortraitView && my.brush && key == my.uid) {
    // console.log('build_devices key', key, 'uid', my.uid, 'brush', my.brush);
    my.brush.sync(my.uid);
  }
}

function device_for_uid(uid) {
  // console.log('device_for_uid uid', uid, my.device_values[uid]);
  return my.device_values[uid];
}

function device_uid_isActive(uid) {
  let fdevice = my.fireb_devices[uid];
  // console.log('device_uid_isActive uid', uid, 'portrait', fdevice.serverValues.controller);
  return dbase_device_isActive(fdevice) && fdevice.serverValues.controller;
}

function issue_clear_action() {
  dbase_update_props({}, { clear_action: dbase_value_increment(1) });
}

// function update_brush(my) {
//   if (!my.db_update) return;
//   let {
//     cross_x0, //
//     cross_y0,
//     cross_size,
//     cross_color_index,
//     brush_x0,
//     brush_y0,
//     brush_size,
//     brush_color_index,
//     width,
//     height,
//   } = my;
//   dbase_update_props(
//     {},
//     {
//       cross_x0,
//       cross_y0,
//       cross_size,
//       cross_color_index,
//       brush_x0,
//       brush_y0,
//       brush_size,
//       brush_color_index,
//       width,
//       height,
//     }
//   );
// }
