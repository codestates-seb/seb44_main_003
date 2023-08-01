package com.ott.server.bookmark.repository;

import com.ott.server.bookmark.entity.Bookmark;
import com.ott.server.media.entity.Media;
import com.ott.server.member.entity.Member;
import com.ott.server.recommendation.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Bookmark findByMemberAndMedia(Member member, Media media);

    List<Bookmark> findAllByMember(Member member);

}
