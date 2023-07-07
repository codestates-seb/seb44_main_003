#!/usr/bin/env bash
cd /home/ubuntu/build
sudo java -jar -Dspring.profiles.active=server server-0.0.1-SNAPSHOT.jar > /dev/null 2> /dev/null < /dev/null &