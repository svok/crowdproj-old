package com.crowdproj.gateway.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import javax.naming.ConfigurationException;

import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.crowdproj.common.models.CpSession;

@Configuration
public class CpSessionConfig {

    private static final Logger LOG = LoggerFactory.getLogger(CpSessionConfig.class);

    @Autowired
    private Environment environment;

    @Value("${server.secret:}")
    private String serverSecret;

    @Bean
    public CpSessionFactory init() throws ConfigurationException {
        if(serverSecret.isEmpty()) {
            throw new ConfigurationException("Add server.secret=" + CpSession.generateSecret() + " to your application.properties");
        } else {
            LOG.info("Server secret has been read from config: {}", serverSecret);
            CpSession.setSecret(serverSecret);
            return new CpSessionFactory();
        }
    }

    public static class CpSessionFactory {
        public CpSession build() {
            return new CpSession();
        }
    }
}
