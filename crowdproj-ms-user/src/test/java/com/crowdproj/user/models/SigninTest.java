package com.crowdproj.user.models;

import java.io.IOException;
import java.util.List;
import java.time.LocalDate;

import org.junit.Test;
import org.junit.runner.RunWith;

import com.crowdproj.common.user.Signin;

public class SigninTest {

    @Test
    public void test() throws IOException {
        Signin user = new Signin()
            .setEmail("ivanov@ivan.ru")
            .setPassword("wp}04<d00")
        ;

        assert user.getEmail().equals("ivanov@ivan.ru");
        assert user.getPassword().equals("wp}04<d00");
    }

}
