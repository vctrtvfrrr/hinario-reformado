#!/usr/bin/env bash

function exit_script() {
	echo "Caught SIGTERM"
	exit 0
}

trap exit_script SIGTERM

npm ci
npm run dev &

wait
