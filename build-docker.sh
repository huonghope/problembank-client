#!/bin/bash
echo "version: $1"
docker build . -t problembank-client:$1
docker push problembank-client:$1
