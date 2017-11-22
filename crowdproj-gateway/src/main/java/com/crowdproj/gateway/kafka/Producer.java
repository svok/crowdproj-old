package com.crowdproj.gateway.kafka;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.IntegerSerializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import reactor.core.publisher.Flux;
import reactor.kafka.sender.KafkaSender;
import reactor.kafka.sender.SenderOptions;
import reactor.kafka.sender.SenderRecord;

public class Producer {

    private static final Logger log = LoggerFactory.getLogger(Producer.class.getName());

    private static final String BOOTSTRAP_SERVERS = "localhost:9092";
    private static final String TOPIC = "demo-topic";

    private final KafkaSender<Integer, String> sender;
    private final SimpleDateFormat dateFormat;

    public Producer(String bootstrapServers) {

        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ProducerConfig.CLIENT_ID_CONFIG, "sample-producer");
        props.put(ProducerConfig.ACKS_CONFIG, "all");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, IntegerSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        SenderOptions<Integer, String> senderOptions = SenderOptions.create(props);

        sender = KafkaSender.create(senderOptions);
        dateFormat = new SimpleDateFormat("HH:mm:ss:SSS z dd MMM yyyy");
    }

    public void sendMessages(String topic) throws InterruptedException {
        sender
            .<Integer>send(Flux.range(1, 10)
                .map(i -> SenderRecord.create(new ProducerRecord<>(topic, i, "Message_" + i), i))
            )
            .doOnError(e-> log.error("Send failed", e))
            .subscribe(r -> {
                RecordMetadata metadata = r.recordMetadata();
                System.out.printf("Message %d sent successfully, topic-partition=%s-%d offset=%d timestamp=%s\n",
                    r.correlationMetadata(),
                    metadata.topic(),
                    metadata.partition(),
                    metadata.offset(),
                    dateFormat.format(new Date(metadata.timestamp()))
                );
            })
        ;
    }

    public void close() {
        sender.close();
    }

    public static void main(String[] args) throws Exception {
        Producer producer = new Producer(BOOTSTRAP_SERVERS);
        producer.sendMessages(TOPIC);
        producer.close();
    }
}
