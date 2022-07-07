#!/usr/bin/env bash

# Copy no-bundle demo
mkdir -p "./docs/demos/5-no-bundler-demo/"
cp "./demos/5-no-bundler-demo/index.html" "./docs/demos/5-no-bundler-demo/index.html"

# Build with parcel
if [ "$1" = "build" ]
then
  parcel build demos --dist-dir './docs/demos' --public-url '/reflex/demos' --no-source-maps --no-optimize --no-scope-hoist
#  parcel build demos --dist-dir './docs/demos' --public-url '/docs/demos' --no-scope-hoist	--no-optimize
  echo ""
else
  parcel serve demos --no-source-maps
fi
