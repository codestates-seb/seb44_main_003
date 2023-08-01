package com.ott.server.memberott.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MemberOttDto {
    @AllArgsConstructor
    @Getter
    public static class Response {
        private String memberOttName;
    }
}
