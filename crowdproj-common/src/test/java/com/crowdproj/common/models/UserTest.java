package com.crowdproj.common.models;

import java.io.IOException;
import java.util.List;
import java.time.LocalDate;

import org.junit.Test;
import org.junit.runner.RunWith;

import com.crowdproj.common.models.User;

public class UserTest {

    @Test
    public void test() throws IOException {
        User user = new User()
            .setId("1")
            .setEmail("ivanov@ivan.ru")
            .setFName("Ivan")
            .setMName("Ivanovich")
            .setLName("Ivanov")
            .setBDate("1987-01-12")
        ;

        assert user.getId().equals("1");
        assert user.getFName().equals("Ivan");
        assert user.getMName().equals("Ivanovich");
        assert user.getLName().equals("Ivanov");
        assert user.getFName().equals("Ivan");
        assert user.getBDate().isEqual(LocalDate.of(1987, 1, 12));
    }

}
