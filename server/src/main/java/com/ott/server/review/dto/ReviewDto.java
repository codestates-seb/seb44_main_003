package com.ott.server.review.dto;


import com.ott.server.member.dto.MemberDto;
import com.ott.server.member.entity.Member;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
public class ReviewDto {
    private Long id;
    private String content;
    private Long mediaId;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
    private MemberDto member;
}
