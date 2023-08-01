package com.ott.server.review.repository;

import com.ott.server.media.entity.Media;
import com.ott.server.member.entity.Member;
import com.ott.server.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByMedia(Media media, Pageable pageable);
    Page<Review> findByMember(Member member, Pageable pageable);
}
