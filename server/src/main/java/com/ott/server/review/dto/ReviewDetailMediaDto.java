package com.ott.server.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
public class ReviewDetailMediaDto {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
    private MediaDetailDto media;
}
