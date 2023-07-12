package com.ott.server.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberDetailDto {
    private Long memberId;
    private String nickname;
    private String avatarUri;

}