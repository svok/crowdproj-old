export APACHE_KAFKA_HOME=/opt/kafka

cd $APACHE_KAFKA_HOME

 ./bin/kafka-topics.sh --create \
    --zookeeper localhost:2181 \
    --replication-factor 1 \
    --partitions 3 \
    --topic gateway