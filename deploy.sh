#!/usr/bin/env sh

# abort on errors
set -e

## Deploy to Firebase

yarn build
firebase deploy

## Deploy to Github
# build
# npm run build

# navigate into the build output directory
# cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# git init
# git add -A
# git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# git push -f https://github.com/stetrevor/md-editor.git master:gh-pages

cd -