package com.ott.server.genre.repository;

import com.ott.server.genre.entity.Genre;
import com.ott.server.media.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    void deleteByMedia(Media media);
}
