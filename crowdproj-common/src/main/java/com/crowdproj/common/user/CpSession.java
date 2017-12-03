package com.crowdproj.common.user;

import java.security.Key;
import java.io.IOException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonAnyGetter;
//import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.Properties;
import java.util.Map;
import java.util.HashMap;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class CpSession {

    protected String sessionId;
    protected String userId;
    protected String[] roles;
    protected Date now;
    protected Date exp;

    private static String base64SecretBytes;

    public static CpSession createNew() {
        return new CpSession();
    }

    public CpSession() {
        sessionId = UUID.randomUUID().toString();
        now = new Date();
        exp = new Date(System.currentTimeMillis() + (30 * 3600000 * 24)); // 30 seconds
    }

    @JsonCreator
    public CpSession(
        @JsonProperty("id") String sessionId,
        @JsonProperty("uid") String userId,
        @JsonProperty("now") Long nowTs,
        @JsonProperty("exp") Long expTs
    ) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.now = new Date(nowTs);
        this.exp = new Date(expTs);
    }

    @JsonIgnore
    public CpSession setIdentity(UserInterface user) {
        this.userId = user.getId();
        return this;
    }

    @JsonSetter("id")
    public CpSession setSessionId(String sessionId) {
        this.sessionId = sessionId;
        return this;
    }

    @JsonGetter("id")
    public String getSessionId() {
        return sessionId;
    }

    public CpSession setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    @JsonGetter("uid")
    public String getUserId() {
        return userId;
    }

    @JsonGetter("now")
    public Long getNowTs() {
        return now.getTime();
    }

    @JsonGetter("exp")
    public Long getExpTs() {
        return exp.getTime();
    }

    @JsonGetter("roles")
    public String[] getRoles() {
        return roles;
    }

    @JsonSetter("roles")
    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    @JsonSetter("roles")
    public void getRoles(String[] roles) {
        this.roles = roles;
    }

    @JsonIgnore
    public String getToken() throws IOException {

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles);

        String token = Jwts.builder()
            .setId(sessionId)
            .setIssuedAt(now)
            .setNotBefore(now)
            .setExpiration(exp)
            .setSubject(userId)
            .addClaims(claims)
            .setIssuer("CrowdProj")
            .signWith(SignatureAlgorithm.HS256, getSecret())
            .compact()
        ;

        return token;
    }

    public static CpSession parseToken(String token) throws IOException {
        Claims claims = Jwts.parser()
            .setSigningKey(getSecret())
            .parseClaimsJws(token)
            .getBody()
        ;

        CpSession session = new CpSession()
            .setSessionId(claims.getId())
            .setUserId(claims.getSubject())
        ;
        session.setRoles(claims.get("roles", String[].class));
        session.exp = claims.getExpiration();
        session.now = claims.getNotBefore();

        /*
        System.out.println("----------------------------");
        System.out.println("ID: " + claims.getId());
        System.out.println("Subject: " + claims.getSubject());
        System.out.println("Issuer: " + claims.getIssuer());
        System.out.println("Expiration : " + claims.getExpiration());
        System.out.println("Not Before : "+claims.getNotBefore());
        System.out.println("Audience :: "+claims.getAudience());
        */

        return session;
    }

    @JsonIgnore
    public static void setSecret(String sstr) {
        base64SecretBytes = sstr;
    }

    @JsonIgnore
    public static String getSecret() throws IOException {

//        if(base64SecretBytes != null) {
            return base64SecretBytes;
//        }

/*
        String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
        System.out.println("rootPath: " + rootPath);
        String appConfigPath = rootPath + "application.properties";
        System.out.println("appConfigPath: " + appConfigPath);

        Properties appProps = new Properties();

        try {
            appProps.load(new FileInputStream(appConfigPath));
            String serverSecret = appProps.getProperty("server.secret");

            if(serverSecret != null) {
                base64SecretBytes = serverSecret;
                return base64SecretBytes;
            }
        } catch (IOException e) {
        }

        base64SecretBytes = CpSession.generateSecret();
        appProps.put("server.secret", base64SecretBytes);
        appProps.store(new FileOutputStream(appConfigPath), "Security server.secret property is written");

        return base64SecretBytes;
*/
    }

    public static String generateSecret() {
        Key secret = MacProvider.generateKey(SignatureAlgorithm.HS256);
        byte[] secretBytes = secret.getEncoded();
        return Base64.getEncoder().encodeToString(secretBytes);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder(1024)
            .append("CpSession [sessionId=")
            .append(sessionId)
            .append(", userId=")
            .append(userId)
            .append(", roles=")
            .append(roles)
            .append(", now=")
            .append(now)
            .append(", exp=")
            .append(exp)
            .append("]")
        ;
        return sb.toString();
    }

}
