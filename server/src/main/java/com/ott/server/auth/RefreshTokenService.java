package com.ott.server.auth;

import com.ott.server.auth.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class RefreshTokenService {
    private final JwtTokenizer jwtTokenizer;

    @Autowired
    public RefreshTokenService(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    public TokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Jws<Claims> claimsJws = jwtTokenizer.getClaims(refreshTokenRequest.getRefreshToken(), base64EncodedSecretKey);

        String username = claimsJws.getBody().getSubject(); // 이메일 추출
        System.out.println("^%^$"+username);

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", username);

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String accessToken = "Bearer " +jwtTokenizer.generateAccessToken(claims, username, expiration, base64EncodedSecretKey);
        String refreshToken = jwtTokenizer.delegateRefreshToken(username);

        return new TokenResponse(accessToken, refreshToken);
    }

}
