package com.ott.server.elasticsearch;

import org.hibernate.search.backend.elasticsearch.analysis.ElasticsearchAnalysisConfigurationContext;
import org.hibernate.search.backend.elasticsearch.analysis.ElasticsearchAnalysisConfigurer;

public class CustomElasticsearchAnalysisConfigurer implements ElasticsearchAnalysisConfigurer {

    public CustomElasticsearchAnalysisConfigurer() {
        System.out.println("CustomElasticsearchAnalysisConfigurer Bean is being created!");
    }

    @Override
    public void configure(ElasticsearchAnalysisConfigurationContext context) {
        context.analyzer("autocompleteAnalyzer")
                .custom()
                .tokenizer("ngram")
                .tokenFilters("lowercase", "nori_readingform");

        context.analyzer("standardAnalyzer")
                .custom()
                .tokenizer("standard")
                .tokenFilters("lowercase", "nori_readingform");

        context.tokenizer("ngram")
                .type("ngram")
                .param("min_gram", "1")
                .param("max_gram", "2");

        context.tokenFilter("nori_readingform")
                .type("nori_readingform");

        context.analyzer("ngramStandardAnalyzer")
                .custom()
                .tokenizer("standard")
                .tokenFilters("lowercase", "nori_readingform", "ngramFilter");

        context.tokenFilter("ngramFilter")
                .type("ngram")
                .param("min_gram", "1")
                .param("max_gram", "2");

        context.analyzer("jasoAnalyzer")
                .custom()
                .tokenizer("jaso_tokenizer")
                .tokenFilters("lowercase", "edge_ngram_filter");

        context.tokenizer("jaso_tokenizer")
                .type("jaso_tokenizer")
                .param("mistype", "true")
                .param("chosung", "true");

        context.tokenFilter("edge_ngram_filter")
                .type("edge_ngram")
                .param("min_gram", "1")
                .param("max_gram", "50");

        context.analyzer("suggest_search_analyzer")
                .custom()
                .tokenizer("jaso_search_tokenizer");

        context.analyzer("suggest_index_analyzer")
                .custom()
                .tokenizer("jaso_index_tokenizer")
                .tokenFilters("suggest_filter");

        context.tokenizer("jaso_search_tokenizer")
                .type("jaso_tokenizer")
                .param("mistype", "true")
                .param("chosung", "false");

        context.tokenizer("jaso_index_tokenizer")
                .type("jaso_tokenizer")
                .param("mistype", "true")
                .param("chosung", "true");

        context.tokenFilter("suggest_filter")
                .type("edge_ngram")
                .param("min_gram", "1")
                .param("max_gram", "50");
    }


}