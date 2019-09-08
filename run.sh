#!/bin/sh

sudo docker run \
    --name jekyll-blog \
    -it --rm \
    -p 4000:4000 \
    -v "$PWD:/usr/src/app" \
    starefossen/github-pages
