package com.ott.server.media.dto;

import com.ott.server.genre.entity.Genre;
import com.ott.server.mediaott.entity.MediaOtt;
import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
public class MediaDto {

    @Getter
    public static class Create {
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
        private List<Genre> genre;
        private List<MediaOtt> mediaOtt;
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
        private List<Genre> genre;
        private List<MediaOtt> mediaOtt;

        public void setId(Long id) {
            this.id = id;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long id;
        private String title;
        private String mainPoster;
    }
}
