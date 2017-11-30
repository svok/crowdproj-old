package com.crowdproj.common.user;

import java.io.IOException;
import java.util.List;
import java.time.LocalDate;

import org.junit.Test;
import org.junit.runner.RunWith;

import com.crowdproj.common.user.CpSession;

public class CpSessionTest {

    @Test
    public void test() throws IOException {
        CpSession session = CpSession.createNew();

        assert session.sessionId instanceof String;
        assert session.sessionId.length() > 10;
    }

}
