package com.ott.server.search.controller;

import com.ott.server.media.dto.MultiResponseDto;
import com.ott.server.media.entity.Media;
import com.ott.server.search.mapper.SearchMapper;
import com.ott.server.search.service.SearchService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
    private final SearchService searchService;
    private final SearchMapper searchMapper;

    public SearchController(SearchService searchService, SearchMapper searchMapper) {
        this.searchService = searchService;
        this.searchMapper = searchMapper;
    }

    @GetMapping
    public ResponseEntity search(@RequestParam String q,
                                 @RequestParam(defaultValue = "1") int page,
                                 @RequestParam(defaultValue = "100") int size){

        Page<Media> pageMedias = searchService.search(q, page-1, size);
        List<Media> medias = pageMedias.getContent();


        return new ResponseEntity<>(new MultiResponseDto(searchMapper.mediasToMediaResponseDtos(medias), page, pageMedias.getTotalPages()), HttpStatus.OK);
    }

}
