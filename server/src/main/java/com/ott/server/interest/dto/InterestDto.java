package com.ott.server.interest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InterestDto {
    @AllArgsConstructor
    @Getter
    public static class Response {
        private String interestName;
    }
}
