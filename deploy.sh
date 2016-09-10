#!/bin/bash
set -x

if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_JOB_NUMBER" = "$TRAVIS_BUILD_NUMBER.1" ]
then
  # Determine folder and version based on tag or branch
  if [ ! -z "$TRAVIS_TAG" ]
  then
    echo "PROD: Deploying $TRAVIS_TAG to server"
    folder="meditation-plus"
    version=$TRAVIS_TAG
  elif [ "$TRAVIS_BRANCH" = "master" ]
  then
    echo "TEST: Deploying master to test server"
    folder="meditation-plus-test"
    version="$TRAVIS_BUILD_NUMBER.0.0"
  else
    exit
  fi

  chmod 600 deploy_key
  mv deploy_key ~/.ssh/id_rsa
  touch dist/assets/version.json
  echo "{ \"version\": \"$TRAVIS_TAG\" }" > dist/assets/version.json
  tar -czf transfer-client.tgz dist
  scp -o "StrictHostKeyChecking no" transfer-client.tgz jenkins@159.203.6.130:/var/www/meditation-plus
  ssh -o "StrictHostKeyChecking no" jenkins@159.203.6.130 "cd /var/www/$folder; rm -rf client; mkdir client; tar -xzf transfer-client.tgz -C client --strip 1; rm transfer-client.tgz"
fi