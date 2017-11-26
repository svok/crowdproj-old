package com.crowdproj.gateway.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;

import com.crowdproj.common.events.AbstractEventInternal;

public class Sender {

  private static final Logger LOG = LoggerFactory.getLogger(Sender.class);

  @Autowired
  private KafkaTemplate<String, AbstractEventInternal> kafkaTemplate;

  public void send(String topic, AbstractEventInternal event) {
    LOG.info("sending to {} event='{}'", topic, event);
    kafkaTemplate.send(topic, event);
  }
}
