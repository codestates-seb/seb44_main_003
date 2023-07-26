package com.ott.server.auth.jwt;

import com.ott.server.RedisService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenizer {

    private RedisService redisService;
    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public JwtTokenizer(RedisService redisService) {
        this.redisService = redisService;
    }

//    public String generateRefreshToken(String subject) {
//        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey));
//
//        Date expirationDate = new Date(System.currentTimeMillis() + refreshTokenExpirationMinutes * 60 * 1000);
//
//        return Jwts.builder()
//                .setSubject(subject)
//                .setIssuedAt(new Date())
//                .setExpiration(expirationDate)
//                .signWith(key)
//                .compact();
//    }

//    public Jws<Claims> validateRefreshToken(String token) {
//        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey));
//        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//    }


    public Jws<Claims> validateRefreshToken(String token, String username) {
        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey));
        Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);

        String storedRefreshToken = redisService.get(username);
        if (!token.equals(storedRefreshToken)) {
            throw new ExpiredJwtException(null, null, "Refresh token is not valid");
        }

        return claims;
    }

    public String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = this.getTokenExpiration(this.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = this.encodeBase64SecretKey(this.getSecretKey());

        String refreshToken = this.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        redisService.set(username, refreshToken, refreshTokenExpirationMinutes);

        return refreshToken;
    }


    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        String refreshToken = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
        redisService.set(subject, refreshToken, refreshTokenExpirationMinutes);

        return refreshToken;
    }

    // 검증 후, Claims을 반환 하는 용도
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    // 단순히 검증만 하는 용도로 쓰일 경우
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }
}