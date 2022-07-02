#!/usr/bin/env bash

# Copy no-bundle demo
mkdir -p "./public/5-no-bundler-demo/"
cp "./demos/5-no-bundler-demo/index.html" "./public/5-no-bundler-demo/index.html"

cp "./demos/index.html" "./public/index.html"

if [ "$1" = "build" ]
then
  parcel build demos --dist-dir './public/'
  echo ""
else
  parcel demos --dist-dir './public/'
fi