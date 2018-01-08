#! /usr/bin/bash

git --version
echo "Adding changes..."
git add .
echo "Committing with message $1"
git commit -m "$1"
echo "Pushing origin to master..."
git push origin master