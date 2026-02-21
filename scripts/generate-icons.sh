#!/usr/bin/env bash
# Generate PWA manifest icons from favicon.svg using ImageMagick

cd "$(dirname "$0")/../public" || exit 1

if ! command -v magick &> /dev/null; then
  echo "ImageMagick ('magick') not found. Please install it first."
  exit 1
fi

export MAGICK_TEMPORARY_PATH="/tmp"

echo "Generating 192x192 icon..."
magick -background none favicon.svg -resize 192x192 icon-192.png

echo "Generating 512x512 icon..."
magick -background none favicon.svg -resize 512x512 icon-512.png

echo "Done! Icons generated in public/"
