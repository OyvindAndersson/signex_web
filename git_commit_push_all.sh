#! /usr/bin/bash

git --version
git add .
git commit -m "$1"
git push origin master