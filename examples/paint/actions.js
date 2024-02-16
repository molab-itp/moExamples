// # --

function paintOffAction() {
  console.log('paintOffAction');
  // dbase_update_props({}, { vote_count: dbase_value_increment(1) });
  my.color = null;
}

function paintRedAction() {
  console.log('paintRedAction');
  my.color = 'red';
}

function paintGreenAction() {
  console.log('paintGreenAction');
  my.color = 'green';
}

function paintGoldAction() {
  console.log('paintGoldAction');
  my.color = my.colorGold;
}

// # --

function moveLeftAction() {
  console.log('moveLeftAction');
  my.xSpeed += -1;
  my.ySpeed = 0;
  // dbase_update_props({}, { vote_count: dbase_value_increment(1) });
}

function moveRightAction() {
  console.log('moveRightAction');
  my.xSpeed += 1;
  my.ySpeed = 0;
  // dbase_update_props({}, { vote_count: dbase_value_increment(-1) });
}

function moveUpAction() {
  console.log('moveUpAction');
  my.xSpeed = 0;
  my.ySpeed += -1;
  // dbase_update_props({}, { vote_count: dbase_value_increment(-1) });
}

function moveDownAction() {
  console.log('moveDownAction');
  my.xSpeed = 0;
  my.ySpeed += 1;
  // dbase_update_props({}, { vote_count: dbase_value_increment(-1) });
}

// # --

// RGB(187, 165, 61)
// Chrome Gold
// https://color-term.com/color/lego-chrome-gold-bba53d/
