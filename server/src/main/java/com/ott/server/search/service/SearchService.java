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
import java.util.stream.Collectors;
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







    public List<String> autocomplete(String titleFragment, Pageable pageable) {
        SearchSession searchSession = Search.session(entityManager);

        SearchQuery<Media> query = searchSession.search(Media.class)
                .where(f -> f.bool()
                        .should(f.match()
                                .field("title")
                                .matching(titleFragment)))
                        .toQuery();

        List<Media> mediaList = query.fetchHits((int) pageable.getOffset(), pageable.getPageSize());

        List<String> titles = mediaList.stream()
                .map(Media::getTitle)
                .collect(Collectors.toList());

        return titles;
    }










}
