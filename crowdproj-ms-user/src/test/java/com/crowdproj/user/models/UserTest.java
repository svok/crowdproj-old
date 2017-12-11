package com.crowdproj.user.models;

import java.io.IOException;
import java.util.List;
import java.time.LocalDate;

import org.junit.Test;
import org.junit.runner.RunWith;

import com.crowdproj.common.user.UserInfo;

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
