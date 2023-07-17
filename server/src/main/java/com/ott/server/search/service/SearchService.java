package com.ott.server.search.service;

import com.ott.server.media.entity.Media;
import com.ott.server.media.repository.MediaRepository;
//import com.ott.server.search.dto.SearchResult;
import org.hibernate.search.engine.search.query.SearchQuery;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;

@Service
public class SearchService {
    private final MediaRepository mediaRepository;
//    private final MediaElasticsearchRepository mediaElasticsearchRepository;
    private final EntityManager entityManager;

    public SearchService(MediaRepository mediaRepository,  EntityManager entityManager) {
        this.mediaRepository = mediaRepository;
//        this.mediaElasticsearchRepository = mediaElasticsearchRepository;
        this.entityManager = entityManager;
    }

    public Page<Media> search(String query, int page, int size){

        return mediaRepository.findByTitle(query,PageRequest.of(page, size, Sort.by("releaseDate").descending()));
    }


//    public SearchResult search(String titleFragment, int page, int size) {
//        SearchSession searchSession = Search.session(entityManager);
//
//        SearchQueryOptionsStep<?, EntityReference, ?, ?, ?> optionsStep = searchSession.search(Media.class)
//                .selectEntityReference()
//                .where(f -> f.bool()
//                        .must(f.match()
//                                .field("title_standard")
//                                .matching(titleFragment)
//                                .fuzzy(2, 2)
//                                .analyzer("ngramStandardAnalyzer")));
//
//        Pageable pageable = PageRequest.of(page, size);
//        int fetchSize = Math.toIntExact(pageable.getOffset() + pageable.getPageSize());
//        List<EntityReference> hits = optionsStep.fetch(fetchSize).hits();
//
//        List<Long> hitIds = hits.stream()
//                .map(ref -> (Long) ref.id())
//                .collect(Collectors.toList());
//
//        // Use Stream API to convert Iterable to List
//        List<Media> medias = StreamSupport.stream(mediaRepository.findAllById(hitIds).spliterator(), false)
//                .collect(Collectors.toList());
//        int start = (int) pageable.getOffset();
//        int end = Math.min((start + pageable.getPageSize()), medias.size());
//        List<Media> pageContent = medias.subList(start, end);
//
//        SearchResult searchResult = new SearchResult();
//        searchResult.setMedias(pageContent);
//        searchResult.setOriginalQuery(titleFragment);
//
//        return searchResult;
//    }








    public List<String> autocomplete(String titleFragment, Pageable pageable) {
        SearchSession searchSession = Search.session(entityManager);

        SearchQuery<Media> query = searchSession.search(Media.class)
                .where(f -> f.match()
                        .field("title")
                        .matching(titleFragment))
                .toQuery();

        List<Media> mediaList = query.fetchHits((int) pageable.getOffset(), pageable.getPageSize());

        List<String> titles = mediaList.stream()
                .map(Media::getTitle)
                .collect(Collectors.toList());

        return titles;
    }









}
