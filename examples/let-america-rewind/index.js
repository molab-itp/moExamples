//

let my = {};

console.log('let-america-rewind index.js');

document.addEventListener('DOMContentLoaded', document_loaded);

window.addEventListener('resize', resize_window);

id_rewind_btn.addEventListener('click', rewind_action);

function document_loaded() {
  console.log('document_loaded');

  my_setup();

  dbase_app_init({ completed: app_init_completed });
}

function app_init_completed() {
  //
  dbase_app_observe({ observed_item });

  function observed_item(item) {
    let rewind_action_count = item.rewind_action_count;
    if (rewind_action_count != null && rewind_action_count != my.rewind_action_count) {
      // rewind action triggered
      console.log('rewind action triggered my.rewind_action_count', my.rewind_action_count);
      console.log('rewind_action_count', rewind_action_count);
      my.rewind_action_count = rewind_action_count;
    }
  }
}

function rewind_action() {
  console.log('rewind_action');
  dbase_update_item({ rewind_action_count: dbase_increment(1) });
}

function my_setup() {
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'room0';
  my.nameDevice = '';

  my.mo_app = 'mo-america-rewind';
  my.group = 's0';

  my.rewind_action_count = 0;
}

function resize_window() {
  console.log('resize_window');
}

function ui_log(...args) {
  console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}
