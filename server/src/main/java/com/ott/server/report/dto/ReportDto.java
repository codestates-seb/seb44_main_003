package com.ott.server.report.dto;

import com.ott.server.member.entity.Member;
import lombok.Getter;
import lombok.Setter;
import org.joda.time.DateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ReportDto {
    @Getter
    public static class Post{
        @NotNull(message = "미디어를 선택하시오.")
        private Long mediaId;
        @NotBlank(message = "제목을 입력하시오.")
        private String title;
        @NotBlank(message = "오류 내용을 입력하시오.")
        private String content;

    }

    @Getter
    public static class Patch{
        private String title;
        private String content;
        private Boolean completion;

    }

    @Setter
    @Getter
    public static class Response{
        private long id;
        private long mediaId;
        private String title;
        private String content;
        private Boolean completion;
        private LocalDateTime createdAt;
        private LocalDateTime lastModifiedAt;
    }
}
