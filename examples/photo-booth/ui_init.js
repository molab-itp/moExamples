//
function ui_init() {
  //
  my.addBtn = ui_createButton('Add');
  my.addBtn.mousePressed(add_action);

  my.removeBtn = ui_createButton('Remove');
  my.removeBtn.mousePressed(remove_action);

  my.showBtn = ui_createButton('Show');
  my.showBtn.mousePressed(show_action);

  my.photo_count_span = createSpan('' + my.photo_count);
}

function add_action() {
  console.log('add_action');
  dbase_update_props({ photo_count: dbase_increment(1) });
  console.log('add_action photo_count', my.photo_count);

  let layer = my.canvas;
  let path = photo_path(my.uid, my.photo_count);
  let imageQuality = my.imageQuality;

  fstorage_upload({ layer, path, imageQuality });
}

function remove_action() {
  console.log('remove_action');

  let path = photo_path(my.uid, my.photo_count);

  fstorage_remove({ path });

  dbase_update_props({ photo_count: dbase_increment(-1) });
}

function photo_path(uid, count) {
  let nphoto = count.toString().padStart(3, '0');
  return uid + '/' + nphoto + my.imageExt;
}

function show_action() {
  //
  my.gallery_div = ui_div_empty('igallery');
  for (let index = 1; index <= my.photo_count; index++) {
    let path = photo_path(my.uid, index);
    let imageType = 'image/jpeg';

    fstorage_download_url({ path, imageType, result: url_result });
  }
}

function url_result(url) {
  // console.log('url_result', url);
  let img = createImg(url, 'image');
  my.gallery_div.child(img);
  let iwidth = my.thumbWidth;
  img.style('width: ' + iwidth + 'px;');
}