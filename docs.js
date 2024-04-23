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
// dbase_app_init({});                                // lobby
// dbase_app_init({ completed: startup_completed });  // paint
// dbase_app_init({ completed: dbase_host_init });    // pixel-grid
// dbase_app_init({ completed: startup_completed });  // vote
// dbase_app_init({ completed: startup_completed });  // words

// ## -
// function dbase_update_props(props, options) {

// dbase_update_props({ vote_count: dbase_increment(1) });  // vote
// dbase_update_props({ vote_count: dbase_increment(-1) }); // vote
// dbase_update_props({ echo_delay: 0 }, { group: group });   // mo-blackfacts
// dbase_update_props({ echo_delay }, { group: group });      // mo-blackfacts
// dbase_update_props({ startup_time: timeSecs });            // mo-blackfacts
// dbase_update_props({ startup_stall: increment(1) });       // mo-blackfacts
// dbase_update_props(my.db_queue);             // dbase_queue_update
// dbase_update_props({}, { count: 1 });        // dbase_app_init
// dbase_update_props(item, { group: group });  // dbase_update_item

// ## -
// function dbase_update_item(item) {
//    dbase_update_props({ group: group }, {}, item);

// ## -
// function dbase_site_updates(updates, keys) {

//  dbase_site_updates({ portrait, group });
//  dbase_site_updates({}, keys);
//    dbase_site_updates({}, { event: 'visit', count: 'visit_count' });
//    dbase_site_updates({}, { event: 'update', count: 'update_count' });

// ## -
// function dbase_app_observe({ observed_key, removed_key }, apps) {

// dbase_app_observe({ observed_item });      // mo-blackfacts
//

// dbase_app_observe(                         // pixel-grid
//   { observed_key, removed_key }, //
//   { app: 'mo-pix-chip', tag: 'dbase_pix_chip_observe' }
// );
// dbase_app_observe uses firebase realtime db's built in functions
// see https://firebase.google.com/docs/database/web/lists-of-data

// dbase_app_observe(                        // pixel-grid
//   { observed_key, removed_key }, //
//   { app: 'mo-pix-grid', tag: 'dbase_pix_grid_observe' }
// );

// ## -
// function dbase_devices_observe({ observed_key, removed_key, all }) {

// dbase_devices_observe({ observed_key, removed_key }); // paint
// dbase_devices_observe({ observed_key, all: 1 }); // vote
// dbase_devices_observe({ observed_key, all: 1 }); // word

// ## -
// function dbase_increment(value) {

// ## -
// function dbase_a_devices() {

// function dbase_a_device_for_uid(uid) {

// function dbase_queue_update(props) {

// function dbase_poll() {

// function dbase_actions_issued(uid, actions) {

// function dbase_issue_actions(actions, options) {

// function dbase_remove_room() {

// function dbase_remove_mo_app() {

// export function get_url_params() {

// ## -
// examples are located in /examples
// examples include:

// iframe_player:
// a website playlist made using iframes
// using item_index in the server to play real-time in available devices 

// photo-booth:
// take up to maximum 3 photos with add button
// save and delete photos in the server

// lobby:
// serve as a device watcher/observer for the POWER TO THE PEOPLE exhibition by John Henry Thompson at the Clive Davis Gallery
// count the current available devices watching the exhibition

// paint
// real-time multi-user drawing canvas controlled with both landscape(desktop) and portrait(cellphone) mode

// pixel-grid

// vote:
// real-time voting examples that count your own votes and total votes from available devices; built with firebase

// words
/* --
bin/git-release.sh

./p5moLibrary/bin/build.sh --src ./ --files examples,README.md --prod

 */

/* --
2024-03-02 jht:  
  renamed dbase_value_increment --> dbase_increment

  function dbase_update_props(options, deviceProps, groupProps) {
    -->
    function dbase_update_props(props, options) {

  dbase_devices_ --> dbase_site_
  dbase_a_devices_ --> dbase_devices_

  function dbase_devices_observe({ observed_a_device, removed_a_device, all }) {
    -->
    function dbase_devices_observe({ observed_key, removed_key, all }) {

*/

/* --

alias crud=./p5mirrorLib-private/bin/crud.sh
*/
