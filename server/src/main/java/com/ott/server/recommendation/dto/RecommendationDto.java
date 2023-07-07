package com.ott.server.recommendation.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class RecommendationDto {
    @Getter
    public static class Post {
        private Long mediaId;
    }
}

