#!/usr/bin/env bash

# Copy no-bundle demo
mkdir -p "./public/demos/5-no-bundler-demo/"
cp "./demos/demos/5-no-bundler-demo/index.html" "./public/demos/5-no-bundler-demo/index.html"

cp "./demos/index.html" "./public/demos/index.html"

if [ "$1" = "build" ]
then
  parcel build demos --dist-dir './public/demos/'
  echo ""
else
  parcel demos --dist-dir './public/demos/'
fi
