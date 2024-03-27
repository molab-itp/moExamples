#!/bin/bash
cd ${0%/*}

# clone p5moLibrary
# clone p5moRelease 

cd ..

# check for destination p5moLibrary
dest=p5moLibrary
if [ ! -e "$dest" ]; then
  git clone https://github.com/molab-itp/$dest.git $dest
fi
if [ ! -e "$dest" ]; then
  echo "fail to clone to $dest"
  exit
fi

# check for destination p5moRelease
dest=p5moRelease
if [ ! -e "$dest" ]; then
  git clone https://github.com/molab-itp/$dest.git $dest
fi
if [ ! -e "$dest" ]; then
  echo "fail to clone to $dest"
  exit
fi

# check for destination p5videoKit
dest=p5videoKit
if [ ! -e "$dest" ]; then
  git clone https://github.com/molab-itp/$dest.git $dest
  pushd $dest > /dev/null
  git checkout next
  popd > /dev/null
fi
if [ ! -e "$dest" ]; then
  echo "fail to clone to $dest"
  exit
fi

