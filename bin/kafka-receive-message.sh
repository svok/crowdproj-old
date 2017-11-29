#!/bin/bash

export APACHE_KAFKA_HOME=/opt/kafka

cd $APACHE_KAFKA_HOME

./bin/kafka-console-producer.sh --broker-list localhost:9092 --topic session
