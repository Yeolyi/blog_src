set -e # https://stackoverflow.com/questions/821396/aborting-a-shell-script-if-any-command-returns-a-non-zero-value

read -r commitName
git add .
git commit -m "$commitName"
git push
cd ../blog
git submodule foreach git pull
git add .
git push -f
