package com.crowdproj.gateway.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

//import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventInternalDefault;

@Service
@Scope(value = "singleton")
public class Sender {

  private static final Logger LOG = LoggerFactory.getLogger(Sender.class);

  @Autowired
  private KafkaTemplate<String, EventInternalDefault> kafkaTemplate;

  public void send(String topic, EventInternalDefault event) {
    LOG.info("sending to {} event='{}'", topic, event);
    kafkaTemplate.send(topic, event);
  }

}
