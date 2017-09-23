#!/bin/bash
set -x

server="meditation-dev.sirimangalo.org"
version="$TRAVIS_BUILD_NUMBER.0.0"

# set version
touch ./version.js
echo "exports.version = \"$version\";" > ./version.js

# set api config
touch ./src/api.config.ts
echo "export class ApiConfig {
  public static url = 'https://$server';
}" > ./src/api.config.ts
