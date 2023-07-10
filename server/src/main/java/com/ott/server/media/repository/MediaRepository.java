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
import java.util.Optional;

public interface MediaRepository extends JpaRepository<Media, Long> {

    Optional<Media> findByMediaId(Long mediaId);
    Page<Media> findDistinctByCategoryAndGenresInAndMediaOttsIn(String category, List<Genre> genre, List<MediaOtt> ott, Pageable pageable);
    @Query("SELECT COUNT(a) FROM Recommendation a WHERE a.media.id = :mediaId")
    Integer findRecommendCountByMediaId(@Param("mediaId") Long mediaId);
    Page<Media> findDistinctByGenresInAndMediaOttsIn(List<Genre> genre, List<MediaOtt> ott, Pageable pageable);
    @Query("SELECT COUNT(a) FROM Bookmark a WHERE a.media.id = :mediaId")
    Integer checkBookmarkByMediaId(@Param("mediaId") Long mediaId);

    @Query("SELECT m FROM Media m where m.title LIKE CONCAT('%', :query, '%') OR m.cast LIKE CONCAT('%', :query, '%') OR m.creator LIKE CONCAT('%', :query, '%')")
    Page<Media> findByTitle(@Param("query")String query, Pageable pageable);
}