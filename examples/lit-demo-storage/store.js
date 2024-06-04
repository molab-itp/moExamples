//
let storeKey = 'lit';

// my.lit.elt.constructor.properties

function restoreStore() {
  //
  my.updateCount = 0;
  let str = localStorage.getItem(storeKey);
  if (!str) return;
  let obj = JSON.parse(str);
  if (!obj) return;
  // console.log('restoreStore obj', obj);

  let target = my.lit.elt;
  for (let prop in obj) {
    target[prop] = obj[prop];
  }
}

function storeUpdateCheck() {
  if (my.updateCount != my.lit.elt.updateCount) {
    // console.log('checkForChanges my.lit.elt.updateCount', my.lit.elt.updateCount);
    my.updateCount = my.lit.elt.updateCount;
    saveStore();
  }
}

function saveStore() {
  //
  let obj = {};
  let props = my.lit.elt.constructor.properties;
  let source = my.lit.elt;
  for (let prop in props) {
    obj[prop] = source[prop];
  }
  let str = JSON.stringify(obj, null, 2);
  // console.log('saveStore str', str);
  localStorage.setItem(storeKey, str);
}
