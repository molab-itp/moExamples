//
function startup_completed() {
  console.log('startup_completed');
  dbase_event_observe({ changed_key_value, removed_key_value });
}

// dbase_event_observe --> dbase_observe_devices
//

function changed_key_value(key, value) {
  // console.log('changed_key_value key', key, 'value', value);
  switch (key) {
    case 'device':
      // value = { uid: { count: xx, vote_count: nn}, ...}
      my.device_values = { ...value };
      // console.log('changed_key_value device_values', my.device_values);
      build_devices();
      break;
  }
}

function removed_key_value(key, value) {
  console.log('removed_key_value key', key, 'value', value);
  switch (key) {
    case 'device':
      my.device_values = {};
      build_devices();
      break;
  }
}

function build_devices() {
  // value = { uid: { count: xx, vote_count: nn}, ...}
  // my.device_values = value;
  // my.devices is device_values in the order
  // of dbase_device_summary
  let allDevices = dbase_device_summary();
  let devices = [];
  for (let index = 0; index < allDevices.length; index++) {
    let adevice = allDevices[index];
    let device = my.device_values[adevice.uid];
    if (device && device_uid_isActive(adevice.uid)) {
      device.uid = adevice.uid;
      device.sortOrder = index;
      // console.log('build_devices device.uid', device.uid, 'sortOrder', device.sortOrder);
      devices.push(device);
    }
  }
  my.devices = devices.sort(function (item1, item2) {
    return item1.sortOrder - item2.sortOrder;
  });
  // console.log('build_devices devices', my.devices);
}

function device_uid_isActive(uid) {
  let device = my.fireb_devices[uid];
  return dbase_device_isActive(device);
}
function issue_clear_action() {
  dbase_update_props({}, { clear_action: dbase_value_increment(1) });
}

function update_brush(my) {
  let {
    cross_x0, //
    cross_y0,
    cross_size,
    cross_color_index,
    brush_x0,
    brush_y0,
    brush_size,
    brush_color_index,
    width,
    height,
  } = my;
  dbase_update_props(
    {},
    {
      cross_x0, //
      cross_y0,
      cross_size,
      cross_color_index,
      brush_x0,
      brush_y0,
      brush_size,
      brush_color_index,
      width,
      height,
    }
  );
}
