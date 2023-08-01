package com.ott.server.search.controller;

import com.ott.server.media.dto.MultiResponseDto;
import com.ott.server.media.entity.Media;
import com.ott.server.search.dto.MultiResponseDtoSearch;
import com.ott.server.search.dto.SearchResult;
import com.ott.server.search.mapper.SearchMapper;
import com.ott.server.search.service.SearchService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/search")
public class SearchController {
    private final SearchService searchService;
    private final SearchMapper searchMapper;

    public SearchController(SearchService searchService, SearchMapper searchMapper) {
        this.searchService = searchService;
        this.searchMapper = searchMapper;
    }

//    @GetMapping
//    public ResponseEntity search(@RequestParam String q, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "100") int size) {
//        SearchResult searchResult = searchService.search(q, page, size);
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("originalQuery", searchResult.getOriginalQuery());
//        response.put("modifiedQuery", searchResult.getModifiedQuery());
//        response.put("searchResults", searchMapper.mediasToMediaResponseDtos(searchResult.getMedias()));
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity search(@RequestParam String q,
                                 @RequestParam(defaultValue = "1") int page,
                                 @RequestParam(defaultValue = "100") int size){

        Page<Media> pageMedias = searchService.search(q, page-1, size);
        List<Media> medias = pageMedias.getContent();

        // 총 결과 수를 가져옵니다.
        long totalResults = pageMedias.getTotalElements();

        return new ResponseEntity<>(new MultiResponseDtoSearch(searchMapper.mediasToMediaResponseDtos(medias), page, pageMedias.getTotalPages(), totalResults), HttpStatus.OK);
    }

    @GetMapping("/autocomplete")
    public ResponseEntity autocomplete(@RequestParam String q,
                                       @RequestParam(defaultValue = "5") int limit){
        Pageable pageable = PageRequest.of(0, limit);
        List<String> titles = searchService.autocomplete(q, pageable);
        return new ResponseEntity<>(titles, HttpStatus.OK);
    }

}
