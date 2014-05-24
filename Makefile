all: compile build run-tests

compile: install-server-vendors

build: build-types build-server 
	# build-client

run-tests: 
	./node_modules/mocha/bin/mocha ./test/**/*.js

build-types:
	./node_modules/.bin/tsc types/mandrill.ts 

build-server:
	./node_modules/.bin/tsc server/**/*.ts server/api.ts -m commonjs

build-client:
	./node_modules/.bin/tsc client/**/*.ts client/api.ts -m commonjs

install-server-vendors:
	npm install

