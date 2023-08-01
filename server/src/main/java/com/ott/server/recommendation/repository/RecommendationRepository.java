package com.ott.server.recommendation.repository;

import com.ott.server.media.entity.Media;
import com.ott.server.member.entity.Member;
import com.ott.server.recommendation.entity.Recommendation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    Recommendation findByMemberAndMedia(Member member, Media media);

    List<Recommendation> findAllByMember(Member member);

    @Query("SELECT a.media.id, COUNT(a) as count FROM Recommendation a GROUP BY a.media.id ORDER BY COUNT(a) DESC")
    Page<Object[]> findRecommendCountByMediaIdOrderByCount(Pageable pageable);

}
