#!/bin/bash

environments=""

while test $# -gt 0; do
  case "$1" in
    --environments)
      shift
      if test $# -gt 0; then
        environments=$1
      fi
      shift
      ;;
    *)
      break
      ;;
  esac
done


# Step 1: stop and remove docker container
docker stop churtke
docker rm churtke

# Step 2: build docker
docker tag churtke churtke:`date +%Y-%m-%d-%H-%M-%S`
docker build --no-cache=true -t churtke .

# Step 3: start new container
docker run \
    --name churtke \
    -p 3000:3000 \
    $environments \
    -d churtke