#!/bin/bash

export APACHE_KAFKA_HOME=/opt/kafka

cd $APACHE_KAFKA_HOME

cat <<EOF | ./bin/kafka-console-producer.sh --broker-list localhost:9092 --topic session
{"type":"test","id":"12345678","tsCreated":3847598093456093,"message":"message"}
EOF
