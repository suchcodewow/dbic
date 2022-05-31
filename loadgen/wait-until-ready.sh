#!/bin/bash

URL=$1
MONOLITH=$2

if [ -z "$URL" ]
then
    URL=http://172.17.0.1
fi

if [ -z "$MONOLITH" ]
then
    MONOLITH=false
fi

attempt_counter=0
max_attempts=10
connect_timeout=2
sleep_time=10

wait_for_page() {
    echo ""
    echo "Waiting for page to be ready: $1"
    until [ $(curl -s -o /dev/null -w '%{http_code}' --connect-timeout $connect_timeout $1) -eq 200 ]; do
        if [ ${attempt_counter} -eq ${max_attempts} ];then
            echo ""
            echo "Max attempts reached"
            exit 1
        fi
        printf '.'
        attempt_counter=$(($attempt_counter+1))
        sleep $sleep_time
    done
    echo ""
    echo " Ready."
}

if [ "$MONOLITH" == "true" ]
then
    echo "Waiting for MONOLITH to be ready"
    wait_for_page $URL
    wait_for_page $URL/backend/version
else
    echo "Waiting for non-MONOLITH to be ready"
    wait_for_page $URL
    wait_for_page $URL/customer/version
    wait_for_page $URL/catalog/version
    wait_for_page $URL/order/version
fi