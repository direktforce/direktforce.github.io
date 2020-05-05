#!/bin/bash
find . -name "*.png" -exec sh -c 'cwebp -q 60 "$1" -o "${1%.png}.webp"' _ {} \;
