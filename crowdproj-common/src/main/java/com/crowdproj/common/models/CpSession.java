package com.crowdproj.common.models;

import java.security.Key;
import java.io.IOException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.Properties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class CpSession {

    protected String sessionId;
    protected String userId;
    protected Date now;
    protected Date exp;

    private static String base64SecretBytes;


    public static CpSession createNew() {
        CpSession session = new CpSession();
        session.sessionId = UUID.randomUUID().toString();
        session.now = new Date();
        session.exp = new Date(System.currentTimeMillis() + (30000 * 3600 * 24)); // 30 seconds
        return session;
    }

    public CpSession setIdentity(User user) {
        this.userId = user.getId();
        return this;
    }

    public CpSession setSessionId(String sessionId) {
        this.sessionId = sessionId;
        return this;
    }

    public CpSession setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    public String getToken() throws IOException {

        String token = Jwts.builder()
            .setId(sessionId)
            .setIssuedAt(now)
            .setNotBefore(now)
            .setExpiration(exp)
            .setSubject(userId)
//            .setIssuer(issuer)
//            .setAudience(audience)
            .signWith(SignatureAlgorithm.HS256, getSecretString())
            .compact()
        ;

        return token;
    }

    public static CpSession parseToken(String token) throws IOException {
        Claims claims = Jwts.parser()
            .setSigningKey(getSecretString())
            .parseClaimsJws(token)
            .getBody()
        ;

        CpSession session = new CpSession()
            .setSessionId(claims.getId())
            .setUserId(claims.getSubject())
        ;
        session.exp = claims.getExpiration();
        session.now = claims.getNotBefore();

        System.out.println("----------------------------");
        System.out.println("ID: " + claims.getId());
        System.out.println("Subject: " + claims.getSubject());
        System.out.println("Issuer: " + claims.getIssuer());
        System.out.println("Expiration : " + claims.getExpiration());
        System.out.println("Not Before : "+claims.getNotBefore());
        System.out.println("Audience :: "+claims.getAudience());

        return session;
    }

    public static String getSecretString() throws IOException {

        // Если уже инициализировали, то пытаемся прочитать из переменной
        if(base64SecretBytes != null) {
            return base64SecretBytes;
        }

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

        Key secret = MacProvider.generateKey(SignatureAlgorithm.HS256);
        byte[] secretBytes = secret.getEncoded();
        base64SecretBytes = Base64.getEncoder().encodeToString(secretBytes);
        appProps.put("server.secret", base64SecretBytes);
        appProps.store(new FileOutputStream(appConfigPath), "Security server.secret property is written");

        return base64SecretBytes;
    }

}
