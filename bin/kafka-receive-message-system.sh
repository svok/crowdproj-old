#!/bin/bash

export APACHE_KAFKA_HOME=/opt/kafka

cd $APACHE_KAFKA_HOME

./bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic system
