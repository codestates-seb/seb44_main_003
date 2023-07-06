package com.ott.server.media.repository;

import com.ott.server.genre.entity.Genre;
import com.ott.server.media.entity.Media;
import com.ott.server.mediaott.entity.MediaOtt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {
    Page<Media> findByCategoryAndGenresInAndMediaOttsIn(String category, List<Genre> genre, List<MediaOtt> ott, Pageable pageable);
    @Query("SELECT COUNT(a) FROM Recommendation a WHERE a.media.id = :mediaId")
    Integer findRecommendCountByMediaId(@Param("mediaId") Long mediaId);
    Page<Media> findByGenresInAndMediaOttsIn(List<Genre> genre, List<MediaOtt> ott, Pageable pageable);
    @Query("SELECT COUNT(a) FROM Bookmark a WHERE a.media.id = :mediaId")
    Integer checkBookmarkByMediaId(@Param("mediaId") Long mediaId);
}