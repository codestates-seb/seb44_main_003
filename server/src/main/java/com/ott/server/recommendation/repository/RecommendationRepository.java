package com.ott.server.recommendation.repository;

import com.ott.server.media.entity.Media;
import com.ott.server.member.entity.Member;
import com.ott.server.recommendation.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    Recommendation findByMemberAndMedia(Member member, Media media);

    List<Recommendation> findAllByMember(Member member);

}
