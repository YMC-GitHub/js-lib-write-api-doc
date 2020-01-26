#!/bin/sh

set -e
echo "clean test ouput file: "
rm -rf .nyc_output
rm -rf coverage
rm -rf mochawesome-report

: <<note
rm -rf note
rm -rf CHANGELOG*
note

## file-usage
#./build/clean.sh
#note:i prefer to run in pm
