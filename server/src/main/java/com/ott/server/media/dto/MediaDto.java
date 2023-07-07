package com.ott.server.media.dto;

import com.ott.server.genre.entity.Genre;
import com.ott.server.mediaott.entity.MediaOtt;
import lombok.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Optional;

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
        private Optional<Long> id = Optional.empty();
        private Optional<String> title = Optional.empty();
        private Optional<String> content = Optional.empty();
        private Optional<String> category = Optional.empty();
        private Optional<String> creator = Optional.empty();
        private Optional<String> cast = Optional.empty();
        private Optional<String> mainPoster = Optional.empty();
        private Optional<String> titlePoster = Optional.empty();
        private Optional<Integer> releaseDate = Optional.empty();
        private Optional<String> ageRate = Optional.empty();
        private Optional<Boolean> recent = Optional.empty();
        private Optional<List<String>> genre = Optional.empty();
        private Optional<List<String>> mediaOtt = Optional.empty();



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
