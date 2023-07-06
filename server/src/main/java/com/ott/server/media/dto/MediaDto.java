package com.ott.server.media.dto;

import com.ott.server.genre.entity.Genre;
import com.ott.server.mediaott.entity.MediaOtt;
import lombok.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
public class MediaDto {
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Create {
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

    @Getter
    public static class Update {
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

        public void setId(Long id) {
            this.id = id;
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long id;
        private String title;
        private String mainPoster;
        private List<String> genre;
        private List<String> mediaOtt;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response3 {
        private String title;
        private String content;
        private String category;
        private String creator;
        private String cast;
        private String mainPoster;
        private String titlePoster;
        private Integer releaseDate;
        private String ageRate;
        private Boolean recent;
        private List<String> genre;
        private List<String> mediaOtt;
        private Integer countRecommend;
        private Boolean checkBookmark;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response2 {
        private Long id;
        private String title;
        private String mainPoster;

    }
}
