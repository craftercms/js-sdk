#!/usr/bin/env bash

readonly utilsDir=$(
  cd $(dirname $0)
  pwd
)

cd ${utilsDir}/../dist/packages-dist

PACKAGES=(classes
  content
  ice
  models
  redux
  search
  utils)

# PACKAGES=()

# npm login

for P in ${PACKAGES[@]}; do
  cd $P
  echo ""
  echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  echo "Publihsing '$P' package"
  echo "--------------------------------------------"
  echo "Running command: 'npm publish --tag support-4.1.x'"
  npm publish --tag support-4.1.x
  echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
  echo ""
  cd ../
done
