package com.ott.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@NoArgsConstructor
public class MemberDto {
    @Getter
    public static class Post {
        @NotBlank
        @Email
        private String email;

        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$")
        private String password;

        @NotBlank
        private String nickname;

        private String avatarUri;

        private String category;

        private String[] ott;

        private String[] interest;
    }

    @Getter
    public static class Patch {
        private long memberId;

        @NotBlank
        private String nickname;

        private String avatarUri;

        private String category;

        private String[] ott;

        private String[] interest;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private String nickname;
        private String avatarUri;
        private LocalDateTime createdAt;
    }
}
