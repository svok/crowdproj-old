package com.crowdproj.user;

public class UserMs {

    private static final Shiro shiro = new Shiro();
    private static final Flink flink = new Flink();

    public static void main(String[] args) throws Exception {

        flink.run();

    }
}
