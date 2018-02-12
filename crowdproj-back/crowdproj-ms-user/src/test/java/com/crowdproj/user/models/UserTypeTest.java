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

package com.crowdproj.user.models;

import java.io.IOException;
import java.util.List;
import java.time.LocalDate;

import org.junit.Test;
import org.junit.runner.RunWith;

import com.crowdproj.user.models.UserType;

public class UserTypeTest {

    @Test
    public void testId() throws IOException {
        UserType type = UserType.create(UserType.TYPE_NATURAL);

        assert type.getId() == UserType.TYPE_NATURAL;
        assert type.getTag().equals("natural");
    }

    @Test
    public void testTag() throws IOException {
        UserType type = UserType.create("entrepreneur");

        assert type.getId() == UserType.TYPE_ENTREPRENEUR;
        assert type.getTag().equals("entrepreneur");
    }

}
