#!/bin/bash
cd ${0%/*}

# Produce a release build to main branch

cd ..
# quiet=--quiet

# deploy to github pages
#
# merge branch next in to branch main
# switch back to branch next
#
# echo `date -u +"%Y-%m-%dT%H:%M:%SZ"` "?v=016" > gen/build_ver.txt

./p5moLibrary/bin/build.sh --src ./ --files examples,README.md --prod $quiet

git add . 
git commit $quiet -m "`cat gen/build_ver.txt`"
git push $quiet
# in main
git checkout main $quiet
git merge next $quiet
git push $quiet
# in next
git checkout next $quiet

echo
echo "build `cat gen/build_ver.txt`"

# https://stackoverflow.com/questions/7216358/date-command-on-os-x-doesnt-have-iso-8601-i-option
# date -u +"%Y-%m-%dT%H:%M:%SZ"