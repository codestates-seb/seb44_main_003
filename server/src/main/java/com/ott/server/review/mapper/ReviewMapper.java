package com.ott.server.review.mapper;

import com.ott.server.member.entity.Member;
import com.ott.server.review.dto.MemberDetailDto;
import com.ott.server.review.dto.ReviewDetailDto;
import com.ott.server.review.dto.ReviewDetailMediaDto;
import com.ott.server.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(target = "nickname", source = "member.nickname")
    @Mapping(target = "avatarUri", source = "member.avatarUri")
    @Mapping(target = "memberId", source = "member.memberId")
    MemberDetailDto memberToMemberDetailDto(Member member);

    @Mapping(target = "id", source = "review.id")
    @Mapping(target = "content", source = "review.content")
    @Mapping(target = "createdAt", source = "review.createdAt")
    @Mapping(target = "lastModifiedAt", source = "review.lastModifiedAt")
    @Mapping(target = "member", source = "review.member")
    ReviewDetailDto reviewToReviewDetailDto(Review review);

    @Mapping(target = "id", source = "review.id")
    @Mapping(target = "content", source = "review.content")
    @Mapping(target = "createdAt", source = "review.createdAt")
    @Mapping(target = "lastModifiedAt", source = "review.lastModifiedAt")
    @Mapping(target = "media", source = "review.media")
    ReviewDetailMediaDto reviewToReviewDetailMediaDto(Review review);
}



