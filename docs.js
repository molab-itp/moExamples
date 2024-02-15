//
// p5moLibrary functions

// # --
// function dbase_app_init({ completed }) {

//   dbase_app_init({ completed: dbase_host_init });
//   dbase_app_init({ completed: dbase_host_init });
//   dbase_app_init({ completed: dbase_host_init });

// # --
// function dbase_update_props(props, deviceProps, groupProps) {
//  default deviceProps = { count: increment(1) };

//  dbase_update_props({ qrcode });
//  dbase_update_props({}, {}, { group: my.group, index });
//  dbase_update_props({ index });
//  dbase_update_props({}, { startup_time: timeSecs });
//  dbase_update_props({}); // Send initial ping

// # --
// function dbase_device_updates(updates, keys) {

//  dbase_device_updates({ portrait, group });
//  dbase_device_updates({}, keys);
//    dbase_device_updates({}, { event: 'visit', count: 'visit_count' });
//    dbase_device_updates({}, { event: 'update', count: 'update_count' });

// # --
// function dbase_event_observe({ changed_key_value, removed_key_value }, apps) {

// dbase_event_observe({ changed_key_value: mo_app_key_value });
//
// function mo_app_key_value(key, value) {
// switch (key) {
//  case 'index':
//  case 'qrcode':
//  case 'device':
//  case 'group':

// dbase_event_observe(
//   { changed_key_value, removed_key_value }, //
//   { app: 'mo-pix-chip', tag: 'dbase_pix_chip_observe' }
// );

// dbase_event_observe(
//   { changed_key_value, removed_key_value }, //
//   { app: 'mo-pix-grid', tag: 'dbase_pix_grid_observe' }
// );

// # --
// function dbase_value_increment(value) {
