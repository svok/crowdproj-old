package com.crowdproj.common.events.user;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;

public class EventSender extends AbstractEventInternal {

    protected String contact;
    protected String templateId;
    protected Map<String, Object> properties; // Properties for template
    protected AbstractEventInternal onReady;

    public EventSender() {
        super();
    }

    @JsonCreator
    public EventSender(@JsonProperty("contact") String contact, @JsonProperty("templateId") String templatedId) {
        setContact(contact);
        setTemplateId(templateId);
    }

    // --- email -----
    public String getContact() {
        return contact;
    }

    public EventSender setContact(String contact) {
        this.contact = contact;
        return this;
    }

    // templateId
    public String getTemplateId() {
        return templateId;
    }

    public EventSender setTemplateId(String templateId) {
        this.templateId = templateId;
        return this;
    }

    // properties
    public Map<String,Object> getProperties() {
        return properties;
    }

    public EventSender setProperties(Map<String,Object> properties) {
        this.properties = properties;
        return this;
    }

    // onReady
    public AbstractEventInternal getOnReady() {
        return onReady;
    }

    public EventSender setOnReady(AbstractEventInternal onReady) {
        this.onReady = onReady;
        return this;
    }

    @Override
    public String toString() {
        return super.toString()
            + "    contact=" + contact
            + "\n    templateId=" + templateId
            + "\n    properties=" + properties
            + "\n    onReady=" + onReady
            + "\n";
    }

}
