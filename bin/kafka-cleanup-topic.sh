#!/bin/bash

export APACHE_KAFKA_HOME=/opt/kafka

cd $APACHE_KAFKA_HOME

./bin/kafka-topics.sh --zookeeper localhost:2181 --alter --topic gateway --config retention.ms=10000
./bin/kafka-topics.sh --zookeeper localhost:2181 --alter --topic session --config retention.ms=10000
#./bin/kafka-topics.sh --zookeeper localhost:2181 --describe --topic gateway
#./bin/kafka-topics.sh --zookeeper localhost:2181 --describe --topics-with-overrides
#./bin/kafka-configs.sh --zookeeper localhost:2181 --describe --entity-name gateway --entity-type topics

#./bin/kafka-configs.sh --zookeeper localhost:2181 --entity-type topics --entity-name gateway --alter --add-config retention.ms=1000
