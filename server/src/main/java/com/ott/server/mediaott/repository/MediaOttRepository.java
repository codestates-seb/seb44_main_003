package com.ott.server.mediaott.repository;

import com.ott.server.media.entity.Media;
import com.ott.server.mediaott.entity.MediaOtt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaOttRepository extends JpaRepository<MediaOtt, Long> {
    void deleteByMedia(Media media);
}
