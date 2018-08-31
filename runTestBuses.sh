#!/bin/bash

case $1 in
    heroku)
    npm test -- -- params.host=sos1718-sep-vcm.herokuapp.com/#!/buses -- params.port=80
    ;;
    *)
    npm test
    ;;
esac