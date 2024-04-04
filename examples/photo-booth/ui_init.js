//
function ui_init() {
  //
  my.effectBtn = ui_createButton('Effect');
  my.effectBtn.mousePressed(effect_action);

  my.takeBtn = ui_createButton('Take');
  my.takeBtn.mousePressed(take_action);

  my.removeBtn = ui_createButton('Remove');
  my.removeBtn.mousePressed(remove_action);

  my.showBtn = ui_createButton('Show');
  my.showBtn.mousePressed(show_action);

  my.photo_count_span = createSpan('' + my.photo_count);

  my.gallery_div = ui_div_empty('igallery');
}

function effect_action() {
  my.slit_scan = !my.slit_scan;
}

function take_action() {
  console.log('take_action');
  if (my.photo_index >= my.photo_max) {
    dbase_update_props({ photo_index: 1 });
  } else {
    dbase_update_props({ photo_index: dbase_increment(1) });
  }
  my.update_count++;

  let path = photo_path(my.uid, my.photo_index);
  let layer = my.canvas;
  let imageQuality = my.imageQuality;

  fstorage_upload({ path, layer, imageQuality, result: take_action_completed });
  function take_action_completed(arg) {
    console.log('take_action_completed: arg', arg);

    if (my.photo_index > my.photo_count) {
      dbase_update_props({ photo_count: my.photo_index });
    }
  }
}

function remove_action() {
  console.log('remove_action my.photo_count', my.photo_count);
  if (my.photo_count < 1) return;

  let path = photo_path(my.uid, my.photo_count);

  fstorage_remove({ path, result: remove_action_completed });
  function remove_action_completed(arg) {
    console.log('remove_action_completed: arg', arg);

    remove_img_index(my.photo_count);

    dbase_update_props({ photo_count: dbase_increment(-1) });

    if (my.photo_index > my.photo_count) {
      dbase_update_props({ photo_index: my.photo_count });
    }
  }
}

function remove_img_index(index) {
  let id = 'id_img_' + index;
  let img = select('#' + id);
  if (img) {
    img.remove();
  }
}

function photo_path(uid, count) {
  let nphoto = count.toString().padStart(3, '0');
  return uid + '/' + nphoto + my.imageExt;
}

function show_action() {
  //
  for (let index = 1; index <= my.photo_count; index++) {
    let path = photo_path(my.uid, index);
    fstorage_download_url({
      path,
      result: (url) => {
        url_result(url, index);
      },
    });
  }
  function url_result(url, index) {
    // console.log('url_result', url);
    let id = 'id_img_' + index;
    let img = select('#' + id);
    if (!img) {
      img = createImg(url, 'image');
      img.id(id);
      my.gallery_div.child(img);
      let iwidth = my.thumbWidth;
      img.style('width: ' + iwidth + 'px;');
    }
    // img.elt.src = url + '&v=' + my.update_count;
    img.elt.src = url;
  }
}
