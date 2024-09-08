//

let my = {};

console.log('let-america-rewind index.js');

document.addEventListener('DOMContentLoaded', document_loaded);

window.addEventListener('resize', resize_window);

id_rewind_btn.addEventListener('click', rewind_action);
id_full_read_btn.addEventListener('click', full_read_action);

function document_loaded() {
  console.log('document_loaded');

  my_setup();

  dbase_app_init({ completed: app_init_completed });
}

function app_init_completed() {
  //
  dbase_app_observe({ observed_item });

  function observed_item(item) {
    let rewind_count = item.rewind_count;
    if (rewind_count != null && rewind_count != my.rewind_count) {
      // rewind action triggered
      console.log('rewind action triggered my.rewind_count', my.rewind_count);
      console.log('rewind_count', rewind_count);
      my.rewind_count = rewind_count;
    }
    // {num: 1, text: 'Let...'}
    let line = item.line;
    if (line) {
      console.log('line', line);
      id_line.innerText = `(${line.num}) ${line.text}`;
      id_line.style.backgroundColor = line.color;
    }
  }
}

function full_read_action() {
  console.log('full_read_action');
  dbase_update_item({ full_read: dbase_increment(1) });
}

function rewind_action() {
  console.log('rewind_action');
  dbase_update_item({ rewind_count: dbase_increment(1) });
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

  my.rewind_count = 0;
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
