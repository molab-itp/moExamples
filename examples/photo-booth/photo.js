//

function photo_name(index) {
  return index.toString().padStart(3, '0') + my.imageExt;
}

function photo_path(uid, index) {
  return uid + '/' + photo_name(index);
}

function photo_list_entry(index) {
  let name = photo_name(index);
  return { name, index };
}

function photo_path_entry(uid, entry) {
  return uid + '/' + entry.name;
}

function photo_list_add(entry) {
  my.photo_list.push(entry);
  if (my.photo_list.length > my.photo_max) {
    photo_list_trim();
  }

  // Change to photo_list send to cloud
  dbase_update_props({ photo_list: my.photo_list });
}

function photo_list_trim() {
  //
  // remove the first entry in photo_list
  //
  let first = my.photo_list.shift();
  photo_list_remove_entry(first);
}

function photo_list_remove_entry(entry) {
  console.log('photo_list_remove_entry entry', entry);

  let path = photo_path_entry(my.uid, entry);

  fstorage_remove({ path, result: remove_completed });
  function remove_completed(arg) {
    console.log('photo_list_trim: arg', arg);
  }

  remove_img_index(entry.index);
}

function remove_img_index(index) {
  console.log('remove_img_index index', index);
  let id = 'id_img_' + index;
  let img = select('#' + id);
  console.log('remove_img_index img', img);
  if (img) {
    img.remove();
  }
}

function show_action() {
  //
  // console.log('show_action my.photo_list', my.photo_list);
  for (let entry of my.photo_list) {
    let path = photo_path_entry(my.uid, entry);
    fstorage_download_url({
      path,
      result: (url) => {
        url_result(url, entry.index);
      },
    });
  }
  // url results are not necessarily
  // delivered in the same order requested
  function url_result(url, index) {
    // console.log('url_result', url);
    let id = 'id_img_' + index;
    let img = select('#' + id);
    if (!img) {
      // console.log('show_action id', id);
      img = createImg(url, 'image');
      img.id(id);
      // console.log('show_action createImg', img);
      my.gallery_div.child(img);
      let iwidth = my.thumbWidth;
      img.style('width: ' + iwidth + 'px;');
    }
    img.elt.src = url;
  }
}
