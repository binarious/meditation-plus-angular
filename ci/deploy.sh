#!/bin/bash
set -x

if [ "$TRAVIS_JOB_NUMBER" = "$TRAVIS_BUILD_NUMBER.1" ]
then
  echo "TEST: Deploying master to test server"
  server="meditation-dev.sirimangalo.org"
  version="$TRAVIS_BUILD_NUMBER.0.0"

  chmod 600 deploy_key
  mv deploy_key ~/.ssh/id_rsa
  touch dist/assets/version.json
  echo "{ \"version\": \"$version\" }" > dist/assets/version.json
  tar -czf transfer-client.tgz dist
  scp -o "StrictHostKeyChecking no" transfer-client.tgz jenkins@$server:/var/www/meditation-plus
  ssh -o "StrictHostKeyChecking no" jenkins@$server "cd /var/www/meditation-plus; rm -rf client; mkdir client; tar -xzf transfer-client.tgz -C client --strip 1; rm transfer-client.tgz"
fi
