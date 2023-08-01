package com.ott.server.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MediaDetailDto {
    private Long mediaId;
    private String title;
    private String mainPoster;
}
