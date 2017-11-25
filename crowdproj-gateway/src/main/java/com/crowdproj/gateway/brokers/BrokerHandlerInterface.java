package com.crowdproj.gateway.brokers;

import com.crowdproj.common.events.AbstractEventClient;

public interface BrokerHandlerInterface {

    public void handle(AbstractEventClient event);

}
