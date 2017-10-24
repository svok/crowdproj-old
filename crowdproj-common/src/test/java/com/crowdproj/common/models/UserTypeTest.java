package com.crowdproj.common.models;

import java.io.IOException;
import java.util.List;
import java.time.LocalDate;

import org.junit.Test;
import org.junit.runner.RunWith;

import com.crowdproj.common.models.UserType;

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
