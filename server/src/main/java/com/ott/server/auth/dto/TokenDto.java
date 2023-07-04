package com.ott.server.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class TokenDto {

    @AllArgsConstructor
    @Getter
    public static class Response {
        private String accessToken;
        private String refreshToken;
    }
}
