#!/usr/bin/env bash

readonly utilsDir=$(
  cd $(dirname $0)
  pwd
)

cd ${utilsDir}/../

PACKAGES=(classes
  content
  ice
  models
  redux
  search
  utils)

#PACKAGES=()

for P in ${PACKAGES[@]}; do
  cd packages/$P
  echo "--------------------------------------------"
  echo "Running commands on '$P' package"
  echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  # yarn add somepackage
  # yarn remove somepackage
  # yarn link
  # yarn unlink
  echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
  cd ../../
done
