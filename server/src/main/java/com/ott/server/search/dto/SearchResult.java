package com.ott.server.search.dto;

import com.ott.server.media.entity.Media;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchResult {
    private List<Media> medias;
    private String originalQuery;
    private String modifiedQuery;
}
