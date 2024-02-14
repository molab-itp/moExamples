//
// my dbStoreRootPath: 'm0-@r-@w-',
// dbStoreRootPath/room0/device {
// dbStoreRootPath/room0/pix
//

function dbase_pixgrid_onChild() {
  //
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixgrid`;
  let { getRefPath, onChildAdded, onChildChanged, onChildRemoved } = fireb_.fbase;
  let refPath = getRefPath(path);
  ui_log('dbase_pixgrid_onChild path=', path);

  onChildAdded(refPath, (data) => {
    receivedPixKey('dbase_pixgrid_onChild Added', data);
  });

  onChildChanged(refPath, (data) => {
    receivedPixKey('dbase_pixgrid_onChild Changed', data);
  });

  onChildRemoved(refPath, (data) => {
    receivedPixKey('dbase_pixgrid_onChild Removed', data, { remove: 1 });
  });

  function receivedPixKey(msg, data, remove) {
    let key = data.key;
    let val = data.val();
    ui_log(msg, key, 'n=', val.length);
    let device = dbase_device_fetch_pix(key);
    if (remove) {
      delete device.pixgrids;
      return;
    }
    device.pixgrids = val;
    // console.log('device.pixgrids key', key, 'val', val);
    // console.log('device.pixgrids key', key, 'val n', val.length);
  }
}

function dbase_pixgrid_update(irow, stepPx, row) {
  if (!my.uid) {
    ui_log('dbase_pixgrid_update no uid', my.uid);
    return;
  }
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixgrid/${my.uid}/${irow}`;
  let { getRefPath, update } = fireb_.fbase;
  let refPath = getRefPath(path);
  let i = irow;
  let s = stepPx;
  update(refPath, { i, s, row });

  dbase_device_updates();
}

// db goes to read-only mode when nstep=128
function dbase_pixgrid_removeAll() {
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixgrid`;
  let { getRefPath, set } = fireb_.fbase;
  let refPath = getRefPath(path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('dbase_removeAll OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('dbase_removeAll error', error);
    });
}

function dbase_pixgrid_remove() {
  let path = `${my.dbase_rootPath}/${my.roomName}/mo-pixgrid/${my.uid}`;
  let { getRefPath, set } = fireb_.fbase;
  let refPath = getRefPath(path);
  set(refPath, {})
    .then(() => {
      // Data saved successfully!
      // ui_log('dbase_pixgrid_remove OK');
    })
    .catch((error) => {
      // The write failed...
      ui_log('dbase_pixgrid_remove error', error);
    });
}

function dbase_remove() {
  dbase_device_remove();
  dbase_pixgrid_remove();
  delete my.fireb_devices;
}

// https://console.firebase.google.com/u/0/project/molab-485f5/database/molab-485f5-default-rtdb/data

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0

// https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0#read_data_once_with_an_observer

// https://firebase.google.com/docs/reference/js/database.datasnapshot?authuser=0

// https://firebase.google.com/docs/reference/js/database?authuser=0

// https://firebase.google.com/docs/reference/js/database.md?authuser=0#onchildadded
