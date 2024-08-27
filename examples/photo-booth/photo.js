//

function photo_name(index) {
  return index.toString().padStart(3, '0') + my.imageExt;
}

function photo_list_entry(index) {
  let name = photo_name(index);
  let uid = my.uid;
  return { name, index, uid };
}

function photo_path_entry(entry) {
  return entry.uid + '/' + entry.name;
}

async function photo_list_add(entry) {
  my.photo_list.push(entry);
  if (my.photo_list.length > my.photo_max) {
    await photo_list_trim();
  }

  // Change to photo_list send to cloud
  dbase_update_item({ photo_list: my.photo_list });
}

async function photo_list_trim() {
  //
  // remove the first entry in photo_list
  //
  let first = my.photo_list.shift();
  await photo_list_remove_entry(first);
}

async function photo_list_remove_entry(entry) {
  // console.log('photo_list_remove_entry entry', entry);

  let path = photo_path_entry(entry);
  try {
    await fstorage_remove({ path });
    remove_img_index(entry.index);
  } catch (err) {
    console.log('show_action err', err);
  }
}

async function show_action() {
  //
  // console.log('show_action my.photo_list', my.photo_list);
  for (let entry of my.photo_list) {
    let path = photo_path_entry(entry);
    try {
      let url = await fstorage_download_url({ path });
      url_result(url, entry.index);
    } catch (err) {
      console.log('show_action err', err);
    }
  }
  function url_result(url, index) {
    // console.log('url_result index', index, 'url', url);
    let img = find_img(index);
    img.elt.src = url;
  }
}

async function add_action() {
  let entry = photo_list_entry(my.photo_index + 1);
  let path = photo_path_entry(entry);

  let layer = my.canvas;
  let imageQuality = my.imageQuality;
  try {
    await fstorage_upload({ path, layer, imageQuality });

    await photo_list_add(entry);

    dbase_update_item({ photo_index: dbase_increment(1) });

    //
  } catch (err) {
    console.log('take_action err', err);
  }
}

async function take_action() {
  // console.log('take_action');

  remove_action();

  add_action();
}

async function remove_action() {
  // console.log('remove_action photo_count', my.photo_list.length);
  if (my.photo_list.length < 1) {
    // No more images in the cloud
    //  zero out photo_index
    // dbase_group_update({ photo_index: 0 });
    dbase_update_item({ photo_index: 0 });
    return;
  }
  //
  // remove the last entry in photo_list
  //
  let last = my.photo_list.pop();
  await photo_list_remove_entry(last);

  // Update photo_list in the cloud
  dbase_update_item({ photo_list: my.photo_list });
}
