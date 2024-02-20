//
function startup_completed() {
  console.log('startup_completed');

  dbase_a_device_observe({ observe_a_devices });
  // // 'mo-paint/device'
  // dbase_event_observe(
  //   { changed_key_value, removed_key_value }, //
  //   { app: my.mo_app + '/a_device' }
  // );

  pingAction();

  function observe_a_devices(key) {
    // console.log('build_devices key', key, 'uid', my.uid, 'brush', my.brush);
    if (my.isPortraitView && my.brush && key == my.uid) {
      // console.log('build_devices key', key, 'uid', my.uid, 'brush', my.brush);
      my.brush.sync(my.uid);
    }
  }
}

// !!@ Doc
// dbase_device_updates({ controller });
// function device_uid_isActive(uid) {
//   return dbase_device_isActive(fdevice) && fdevice.serverValues.controller;

function pingAction() {
  let controller = my.isPortraitView ? 1 : 0;
  dbase_device_updates({ controller });
}

function dbase_a_device_observe({ observe_a_devices }) {
  //
  if (!my.a_device_values) my.a_device_values = {};

  // 'mo-paint/a_device'
  dbase_event_observe(
    { changed_key_value, removed_key_value }, //
    { app: my.mo_app + '/a_device' }
  );

  // dbase_event_observe --> dbase_observe_devices
  //

  function changed_key_value(key, value) {
    // console.log('changed_key_value key', key, 'value', value);
    my.a_device_values[key] = value;
    build_devices(key);
  }

  function removed_key_value(key, value) {
    console.log('removed_key_value key', key, 'value', value);
    delete my.a_device_values[key];
    build_devices(key);
  }

  // Could be improve performance by knowing
  // that only specific device is updated?
  //
  // Collection list of active devices
  //  and keep current brush in sync
  //
  function build_devices(key) {
    // console.log('build_devices key', key);
    // value = { uid: { count: xx, vote_count: nn}, ...}
    // my.a_device_values = value;
    //
    let allDevices = dbase_device_summary();
    let devices = [];
    for (let index = 0; index < allDevices.length; index++) {
      let adevice = allDevices[index];
      let uid = adevice.uid;
      let device = my.a_device_values[uid];
      if (device && device_uid_isActive(uid)) {
        device.uid = uid;
        devices.push(device);
      }
    }

    my.a_devices = devices;

    if (observe_a_devices) observe_a_devices(key);
  }
}

function dbase_a_devices() {
  if (!my.a_devices) my.a_devices = [];
  return my.a_devices;
}

function dbase_a_device_for_uid(uid) {
  // console.log('dbase_a_device_for_uid uid', uid, my.a_device_values[uid]);
  if (!my.a_device_values) my.a_device_values = {};
  return my.a_device_values[uid];
}

function dbase_issue_clear_action() {
  dbase_queue_update({ clear_action: dbase_value_increment(1) });
}

function dbase_clear_action_check(my) {
  let actionSeen = 0;
  if (!my.clear_action) my.clear_action = 0;
  if (my.last_clear_action != my.clear_action) {
    my.last_clear_action = my.clear_action;
    actionSeen = 1;
  }
  return actionSeen;
}

// db_update_queue
function dbase_queue_update(props) {
  if (!my.db_update_queue) {
    my.db_update_queue = {};
  }
  dbase_update_props({}, props);
}
