.PHONY: all build get

all: get build

build:
	rm -rf dist
	mkdir dist
	cd frontend-src && yarn run build --progress
	cp -r assets templates dist
	go build
	mv nationilund dist

get:
	cd frontend-src && yarn install
	go get -d
