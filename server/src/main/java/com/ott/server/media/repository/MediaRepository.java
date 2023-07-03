package com.ott.server.media.repository;

import com.ott.server.media.entity.Media;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// MediaRepository
public interface MediaRepository extends JpaRepository<Media, Long> {
    Page<Media> findByCategoryAndGenreAndOtt(String category, List<String> genre, List<String> ott, Pageable pageable);
}
