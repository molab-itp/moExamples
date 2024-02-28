//

// # --
// How to debug from VS Code
//
// F5 to select chrome
// VS Code menu: Run > Start Debugging

// .vscode/launch.json
//       "url": "http://localhost:5500/p5moExamples/examples/vote",

// https://stackoverflow.com/questions/46945784/how-to-debug-javascript-in-visual-studio-code-with-live-server-running

// # --
// p5moLibrary functions

// ## -
// function dbase_app_init({ completed }) {

//   dbase_app_init({ completed: dbase_host_init });
//   dbase_app_init({ completed: dbase_host_init });
//   dbase_app_init({ completed: dbase_host_init });

// ## -
// function dbase_update_props(props, deviceProps, groupProps) {
//  default deviceProps = { count: increment(1) };

//  dbase_update_props({ qrcode });
//  dbase_update_props({}, {}, { group: my.group, index });
//  dbase_update_props({ index });
//  dbase_update_props({}, { startup_time: timeSecs });
//  dbase_update_props({}); // Send initial ping

// ## -
// function dbase_device_updates(updates, keys) {

//  dbase_device_updates({ portrait, group });
//  dbase_device_updates({}, keys);
//    dbase_device_updates({}, { event: 'visit', count: 'visit_count' });
//    dbase_device_updates({}, { event: 'update', count: 'update_count' });

// ## -
// function dbase_app_observe({ observed_key, removed_key }, apps) {

// dbase_app_observe({ changed_key_value: mo_app_key_value });
//
// function mo_app_key_value(key, value) {
// switch (key) {
//  case 'index':
//  case 'qrcode':
//  case 'device':
//  case 'group':

// dbase_app_observe(
//   { observed_key, removed_key }, //
//   { app: 'mo-pix-chip', tag: 'dbase_pix_chip_observe' }
// );
// dbase_app_observe uses firebase realtime db's built in functions
// see https://firebase.google.com/docs/database/web/lists-of-data

// dbase_app_observe(
//   { observed_key, removed_key }, //
//   { app: 'mo-pix-grid', tag: 'dbase_pix_grid_observe' }
// );

// ## -
// function dbase_value_increment(value) {

// ## -

// function dbase_a_devices_observe({ observed_a_device, removed_a_device, all }) {

// function dbase_a_devices() {

// function dbase_a_device_for_uid(uid) {

// function dbase_queue_update(props) {

// function dbase_poll() {

// function dbase_actions_issued(uid, actions) {

// function dbase_issue_actions(actions, options) {
