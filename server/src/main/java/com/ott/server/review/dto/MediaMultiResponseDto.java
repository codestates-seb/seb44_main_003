package com.ott.server.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MediaMultiResponseDto {
    private List<ReviewDetailMediaDto> reviews;
    private Long totalReviews;
    private int currentPage;
    private int totalPage;
}
