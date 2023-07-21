package com.ott.server.auth;

import com.ott.server.auth.jwt.JwtTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;
    private final JwtTokenizer jwtTokenizer;

    @Autowired
    public RefreshTokenController(RefreshTokenService refreshTokenService, JwtTokenizer jwtTokenizer) {
        this.refreshTokenService = refreshTokenService;
        this.jwtTokenizer = jwtTokenizer;
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        TokenResponse tokenResponse = refreshTokenService.refreshToken(refreshTokenRequest);
        return ResponseEntity.ok(tokenResponse);
    }


}
