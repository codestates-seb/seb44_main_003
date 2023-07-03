package com.ott.server.media.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MediaDto {

    private Long id;
    private String title;
    private String content;
    private String category;
    private String creator;
    private String cast;
    private String mainPoster;
    private String titlePoster;
    private int releaseDate;
    private String ageRate;
    private Boolean recent;
    private List<String> genre;
    private List<String> mediaOtt;
}