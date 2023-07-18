package com.ott.server.mediaott.repository;

import com.ott.server.media.entity.Media;
import com.ott.server.mediaott.entity.MediaOtt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaOttRepository extends JpaRepository<MediaOtt, Long> {
    void deleteByMedia(Media media);
    List<MediaOtt> findByMedia(Media media);
    List<MediaOtt> findByOttNameIn(List<String> names);
}
