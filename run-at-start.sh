#!/bin/sh
#
# run-at-start

if [ "$#" != "1" ] ;
  then
  exit -1
done

if [ "$1" == "yes" ] ;
  then
  npm install
  npm run build
  echo "run the following command for the server: $ npm run dev"
done
