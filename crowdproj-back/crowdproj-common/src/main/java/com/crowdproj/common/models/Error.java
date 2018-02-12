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

package com.crowdproj.common.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Error {

    private String error;
    private String component;
    private String field;

    public Error() {}

    @JsonCreator
    public Error(@JsonProperty("error") final String error) {
        setError(error);
    }

    // message
    public Error setError(String error) {
        this.error = error;
        return this;
    }

    public String getError() {
        return error;
    }

    // component
    public Error setComponent(String component) {
        this.component = component;
        return this;
    }

    public String getComponent() {
        return component;
    }

    // field
    public Error setField(String field) {
        this.field = field;
        return this;
    }

    public String getField() {
        return field;
    }

    @Override
    public String toString() {
        return new StringBuilder(1024)
            .append("Error[")
            .append("component=")
            .append(component)
            .append(",field=")
            .append(field)
            .append(",error=")
            .append(error)
            .toString()
        ;
    }

}
