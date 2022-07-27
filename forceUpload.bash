set -e 

git add .
git commit --amend --no-edit
git push -f

cd ~/Developer/blog
git submodule foreach git pull
git add .
git commit --amend --no-edit
git push -f

open https://vercel.com/dashboard