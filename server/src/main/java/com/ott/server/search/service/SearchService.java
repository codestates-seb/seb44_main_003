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

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;

import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.search.builder.SearchSourceBuilder;

@Service
public class SearchService {
    private final MediaRepository mediaRepository;
//    private final MediaElasticsearchRepository mediaElasticsearchRepository;
    private final EntityManager entityManager;
    private RestHighLevelClient client;


    public SearchService(MediaRepository mediaRepository, EntityManager entityManager, RestHighLevelClient client) {
        this.mediaRepository = mediaRepository;
//        this.mediaElasticsearchRepository = mediaElasticsearchRepository;
        this.entityManager = entityManager;
        this.client = client;
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



    public List<String> autocomplete(String titleFragment, Pageable pageable) throws IOException {
        SearchSession searchSession = Search.session(entityManager);
        List<String> results = new ArrayList<>();

        results.addAll(hibernateSearchWithTitles(titleFragment, pageable, searchSession));

        results.addAll(elasticsearchWithCastName(titleFragment));

        return results;
    }

    private List<String> hibernateSearchWithTitles(String titleFragment, Pageable pageable, SearchSession searchSession) {
        List<String> titleList = new ArrayList<>();

        SearchQuery<Media> titleQuery = searchSession.search(Media.class)
                .where(f -> f.match()
                        .field("title")
                        .matching(titleFragment))
                .toQuery();

        List<Media> titleMediaList = titleQuery.fetchHits((int) pageable.getOffset(), pageable.getPageSize());
        titleMediaList.forEach(media -> titleList.add(media.getTitle()));

        return titleList;
    }



    private List<String> elasticsearchWithCastName(String titleFragment) throws IOException {
        List<String> castList = new ArrayList<>();

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.matchQuery("name", titleFragment));

        SearchRequest searchRequest = new SearchRequest("jaso");
        searchRequest.source(sourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);

        SearchHits hits = searchResponse.getHits();
        for (SearchHit hit : hits.getHits()) {
            Map<String, Object> sourceAsMap = hit.getSourceAsMap();
            castList.add((String) sourceAsMap.get("name"));
        }

        return castList;
    }





//    public List<String> autocomplete(String titleFragment, Pageable pageable) {
//        SearchSession searchSession = Search.session(entityManager);
//
//        SearchQuery<Media> titleQuery = searchSession.search(Media.class)
//                .where(f -> f.match()
//                        .field("title")
//                        .matching(titleFragment))
//                .toQuery();
//
//        SearchQuery<Media> castQuery = searchSession.search(Media.class)
//                .where(f -> f.match()
//                        .field("cast")
//                        .matching(titleFragment))
//                .toQuery();
//
//        List<Media> titleMediaList = titleQuery.fetchHits((int) pageable.getOffset(), pageable.getPageSize());
//        List<Media> castMediaList = castQuery.fetchHits((int) pageable.getOffset(), pageable.getPageSize());
//
//        List<String> results = new ArrayList<>();
//
//        for (Media media : titleMediaList) {
//            results.add(media.getTitle());
//        }
//
//        for (Media media : castMediaList) {
//            results.add(media.getCast());
//        }
//
//        return results;
//    }












}
