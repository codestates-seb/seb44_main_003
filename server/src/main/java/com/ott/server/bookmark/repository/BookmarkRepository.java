package com.ott.server.bookmark.repository;

import com.ott.server.bookmark.entity.Bookmark;
import com.ott.server.media.entity.Media;
import com.ott.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Bookmark findByMemberAndMedia(Member member, Media media);
}
