# Getting started
1. Install nodejs
2. Install packages required for building this site by running `npm install` in the root of this repository
3. ???
4. Profit


## Convert png to webp
1. Install libwebp with `apt install -y libwebp`
2. Convert png to webp with `dwebp file.png -o file.webp`
2a. Convert multiple png to webp with `find . -name "*.png" -exec sh -c 'dwebp "$1" -o "${1%.png}.webp"' _ {} \;`
