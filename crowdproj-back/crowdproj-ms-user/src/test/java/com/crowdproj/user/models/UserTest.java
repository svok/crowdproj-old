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

import com.crowdproj.user.models.UserInfo;

public class UserTest {

    @Test
    public void test() throws IOException {
        UserInfo user = new UserInfo();
        user.setId("1");
        user.setEmail("ivanov@ivan.ru");
        user.setProperty("fname", "Ivan");
        user.setProperty("mname", "Ivanovich");
        user.setProperty("lname", "Ivanov");
        user.setProperty("bdate", "1987-01-12");

        assert user.getId().equals("1");
        assert user.getProperty("fname").equals("Ivan");
        assert user.getProperty("mname").equals("Ivanovich");
        assert user.getProperty("lname").equals("Ivanov");
        assert user.getProperty("bdate").equals("1987-01-12");
    }

}
