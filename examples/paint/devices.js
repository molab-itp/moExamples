function startup_completed() {
  console.log('startup_completed');
  dbase_event_observe({ changed_key_value, removed_key_value });
}

function changed_key_value(key, value) {
  console.log('changed_key_value key', key, 'value', value);
  switch (key) {
    case 'device':
      // value = { uid: { count: xx, vote_count: nn}, ...}
      my.stored_devices = value;
      //
      let dprops = my.stored_devices[my.uid];
      if (dprops != undefined) {
        console.log('changed_key_value dprops', dprops);
      }
      break;
  }
}

function removed_key_value(key, value) {
  console.log('removed_key_value key', key, 'value', value);
  switch (key) {
    case 'device':
      my.stored_devices = {};
      my.vote_count = 0;
      break;
  }
}

function check_devices() {
  my.devices = dbase_device_summary();
  if (!my.devices) {
    console.log('no devices yet');
    return 0;
  }
  let ndevices = my.devices.length;
  if (ndevices != my.lastn) {
    console.log('ndevices', ndevices);
  }
  my.lastn = ndevices;
  return 1;
}
