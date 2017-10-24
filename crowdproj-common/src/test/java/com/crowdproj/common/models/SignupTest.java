package com.crowdproj.common.models;

import java.io.IOException;
import java.util.List;
import java.time.LocalDate;

import org.junit.Test;
import org.junit.runner.RunWith;

import com.crowdproj.common.models.Signup;

public class SignupTest {

    @Test
    public void test() throws IOException {
        Signup user = new Signup()
            .setEmail("ivanov@ivan.ru")
            .setFName("Ivan")
            .setMName("Ivanovich")
            .setLName("Ivanov")
            .setBDate("1987-01-12")
            .setPassword("wp}04<d00")
            .setPassword1("wp}04<d00")
        ;

        assert user.getFName().equals("Ivan");
        assert user.getMName().equals("Ivanovich");
        assert user.getLName().equals("Ivanov");
        assert user.getFName().equals("Ivan");
        assert user.getBDate().isEqual(LocalDate.of(1987, 1, 12));
        assert user.getBDateString().equals("1987-01-12");
        assert user.getPassword().equals("wp}04<d00");
        assert user.getPassword1().equals("wp}04<d00");
    }

}
