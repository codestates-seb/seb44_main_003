package com.ott.server.recommendation.service;

import com.ott.server.recommendation.dto.RecommendationDto;
import com.ott.server.recommendation.entity.Recommendation;
import com.ott.server.recommendation.repository.RecommendationRepository;
import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.media.entity.Media;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.member.entity.Member;
import com.ott.server.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class RecommendationService {
    private final RecommendationRepository recommendationRepository;
    private final MemberRepository memberRepository;
    private final MediaRepository mediaRepository;

    public RecommendationService(RecommendationRepository recommendationRepository, MemberRepository memberRepository, MediaRepository mediaRepository) {
        this.recommendationRepository = recommendationRepository;
        this.memberRepository = memberRepository;
        this.mediaRepository = mediaRepository;
    }

    public void createOrDeleteRecommendation(RecommendationDto.Post recommendationDto, String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        Media media = mediaRepository.findById(recommendationDto.getMediaId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
        Recommendation existingRecommendation = recommendationRepository.findByMemberAndMedia(member, media);

        if(existingRecommendation != null) {
            recommendationRepository.delete(existingRecommendation);
        }
        else{
            Recommendation recommendation = new Recommendation();
            recommendation.setMember(member);
            recommendation.setMedia(media);
            recommendationRepository.save(recommendation);
        }
    }

    public Recommendation findRecommendation(long recommendationId){
        Recommendation findRecommendation = findVerifiedRecommendation(recommendationId);
        return findRecommendation;
    }

    public void deleteRecommendation(long recommendationId) {
        Recommendation findRecommendation = findVerifiedRecommendation(recommendationId);
        recommendationRepository.delete(findRecommendation);
    }

    private Recommendation findVerifiedRecommendation(long recommendationId) {
        Optional<Recommendation> optionalRecommendation = recommendationRepository.findById(recommendationId);
        Recommendation findRecommendation =
                optionalRecommendation.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));
        return findRecommendation;
    }

    public List<Media> getRecommendationsForUser(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return recommendationRepository.findAllByMember(member)
                .stream()
                .map(Recommendation::getMedia)
                .collect(Collectors.toList());
    }

    public boolean isMediaRecommendedForUser(Long mediaId, String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
        Recommendation recommendation = recommendationRepository.findByMemberAndMedia(member, media);
        return recommendation != null;
    }


}
