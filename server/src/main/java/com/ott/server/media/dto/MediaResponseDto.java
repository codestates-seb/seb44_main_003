package com.ott.server.media.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MediaResponseDto {
    private Long id;
    private String title;
    private String mainPoster;
}
