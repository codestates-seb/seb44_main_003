package com.ott.server.elasticsearch;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.hibernate.search.backend.elasticsearch.analysis.ElasticsearchAnalysisConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.ElasticsearchConfigurationSupport;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.ott.server.media.repository.elastic")
public class ElasticsearchConfig extends ElasticsearchConfigurationSupport {

    @Bean
    public RestHighLevelClient elasticsearchClient() {
        System.out.println("elasticsearchClient() method is being called!");
        ClientConfiguration configuration = ClientConfiguration.builder()
                .connectedTo("localhost:9200")
                .build();

        return RestClients.create(configuration).rest();
    }

    @Bean
    public CustomElasticsearchAnalysisConfigurer customElasticsearchAnalysisConfigurer() {
        System.out.println("customElasticsearchAnalysisConfigurer() method is being called!");
        return new CustomElasticsearchAnalysisConfigurer();
    }


}



