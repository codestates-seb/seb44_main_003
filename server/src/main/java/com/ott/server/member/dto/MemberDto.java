package com.ott.server.member.dto;

import com.ott.server.interest.dto.InterestDto;
import com.ott.server.interest.entity.Interest;
import com.ott.server.memberott.dto.MemberOttDto;
import com.ott.server.memberott.entity.MemberOtt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.repository.query.Param;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

//        private String[] memberOtts = new String[0];

        private List<MemberOtt> memberOtts = new ArrayList<>();
        private List<Interest> interests = new ArrayList<>();
    }

    @Getter
    public static class Patch {
        private long memberId;

        private String nickname;

        private String avatarUri;

        private String category;

        private List<MemberOtt> memberOtts = new ArrayList<>();
        private List<Interest> interests = new ArrayList<>();

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long memberId;
        private String nickname;
        private String avatarUri;
        private LocalDateTime createdAt;
        private List<MemberOttDto.Response> memberOtts;
        private List<InterestDto.Response> interests;
        private List<String> roles;
        private String category;
    }
}
