package com.ott.server.media.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MediaResponseDto {
    private Long id;
    private String title;
    private String mainPoster;
}
