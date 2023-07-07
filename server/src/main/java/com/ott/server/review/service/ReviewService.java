package com.ott.server.review.service;
import com.ott.server.member.dto.MemberDto;
import com.ott.server.review.dto.*;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.media.entity.Media;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.member.entity.Member;
import com.ott.server.member.repository.MemberRepository;
import com.ott.server.review.entity.Review;
import com.ott.server.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final MediaRepository mediaRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, MemberRepository memberRepository, MediaRepository mediaRepository) {
        this.reviewRepository = reviewRepository;
        this.memberRepository = memberRepository;
        this.mediaRepository = mediaRepository;
    }


    public void save(ReviewCreateDto reviewDto, Authentication authentication) {
        if (reviewDto.getMediaId() == null || reviewDto.getContent() == null || reviewDto.getContent().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REVIEW_FORMAT);
        }
        String email = authentication.getPrincipal().toString();
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Media media = mediaRepository.findById(reviewDto.getMediaId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
        Review review = new Review();
        review.setMember(member);
        review.setMedia(media);
        review.setContent(reviewDto.getContent());

        reviewRepository.save(review);
    }

    public Optional<ReviewDetailDto> findById(Long id) {
        return reviewRepository.findById(id)
                .map(review -> {
                    ReviewDetailDto reviewDetailDto = new ReviewDetailDto();
                    reviewDetailDto.setId(review.getId());
                    reviewDetailDto.setContent(review.getContent());
                    reviewDetailDto.setCreatedAt(review.getCreatedAt());
                    reviewDetailDto.setLastModifiedAt(review.getLastModifiedAt());

                    MemberDetailDto memberDetailDto = new MemberDetailDto();
                    memberDetailDto.setNickname(review.getMember().getNickname());
                    memberDetailDto.setAvatarUri(review.getMember().getAvatarUri());

                    reviewDetailDto.setMember(memberDetailDto);
                    return reviewDetailDto;
                });
    }

    public List<ReviewListDto> findAll(int page, int size, Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Pageable pageable = PageRequest.of(page, size);
        return reviewRepository.findAll(pageable).stream()
                .map(review -> {
                    ReviewListDto reviewListDto = new ReviewListDto();
                    reviewListDto.setContent(review.getContent());
                    reviewListDto.setCreatedAt(review.getCreatedAt());
                    reviewListDto.setLastModifiedAt(review.getLastModifiedAt());

                    MemberDetailDto memberDetailDto = new MemberDetailDto();
                    memberDetailDto.setNickname(member.getNickname());
                    memberDetailDto.setAvatarUri(member.getAvatarUri());

                    reviewListDto.setMemberDetailDto(memberDetailDto);

                    return reviewListDto;
                })
                .collect(Collectors.toList());
    }

    public void update(Long id, ReviewUpdateDto newReviewData, Authentication authentication) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        String email = authentication.getPrincipal().toString();
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if (!member.equals(review.getMember())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
        }
        review.setContent(newReviewData.getContent());
        reviewRepository.save(review);
    }

    public void delete(Long id, Authentication authentication) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        String email = authentication.getPrincipal().toString();
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if (!member.equals(review.getMember())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
        }
        reviewRepository.delete(review);
    }

    public List<ReviewDetailDto> findByMediaId(Long mediaId, int page, int size) {
        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return reviewRepository.findByMedia(media, pageable).stream()
                .map(review -> {
                    ReviewDetailDto reviewDetailDto = new ReviewDetailDto();
                    reviewDetailDto.setId(review.getId());
                    reviewDetailDto.setContent(review.getContent());
                    reviewDetailDto.setCreatedAt(review.getCreatedAt());
                    reviewDetailDto.setLastModifiedAt(review.getLastModifiedAt());

                    MemberDetailDto memberDetailDto = new MemberDetailDto();
                    memberDetailDto.setNickname(review.getMember().getNickname());
                    memberDetailDto.setAvatarUri(review.getMember().getAvatarUri());

                    reviewDetailDto.setMember(memberDetailDto);

                    return reviewDetailDto;
                })
                .collect(Collectors.toList());
    }

}
