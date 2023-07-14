#!/usr/bin/env bash
sudo nohup java -jar -Dspring.profiles.active=server /home/ubuntu/build/server-0.0.1-SNAPSHOT.jar > /dev/null &

