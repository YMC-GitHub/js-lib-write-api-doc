#!/bin/sh

set -e
echo "clean test ouput file: "
rm -rf .nyc_output
rm -rf coverage
rm -rf mochawesome-report

rm -rf note
rm -rf CHANGELOG*

## file-usage
#./build/clean.sh
#note:i prefer to run in pm
