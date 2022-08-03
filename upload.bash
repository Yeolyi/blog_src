set -e # https://stackoverflow.com/questions/821396/aborting-a-shell-script-if-any-command-returns-a-non-zero-value

cd ~/Developer/blog
git fetch
git rebase origin/nextJS

cd blog_src
git fetch
git rebase origin/main

cd ..
git add .
git commit --amend --no-edit
git push -f
