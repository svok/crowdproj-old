/**
 *
 * Copyright © 2017 Sergey Okatov. All rights reserved.
 * Author: Sergey Okatov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
