package com.ott.server.search.service;

import com.ott.server.media.dto.MediaResponseDto;
import com.ott.server.media.entity.Media;
import com.ott.server.media.repository.MediaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SearchService {
    private final MediaRepository mediaRepository;

    public SearchService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public Page<Media> search(String query, int page, int size){

        return mediaRepository.findByTitle(query,PageRequest.of(page, size, Sort.by("releaseDate").descending()));
    }
}
