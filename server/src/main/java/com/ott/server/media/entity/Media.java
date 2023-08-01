package com.ott.server.media.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ott.server.audit.Auditable;
import com.ott.server.bookmark.entity.Bookmark;
import com.ott.server.genre.entity.Genre;
import com.ott.server.mediaott.entity.MediaOtt;
import com.ott.server.recommendation.entity.Recommendation;
import com.ott.server.report.entity.Report;
import com.ott.server.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.search.engine.backend.types.Projectable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.KeywordField;
import org.springframework.data.elasticsearch.annotations.Document;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Indexed(index = "media")
public class Media extends Auditable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;


    @FullTextField(analyzer = "standardAnalyzer", name = "title_standard")// todo jaso analyzer 쓰면서 사용안하게될듯
    @FullTextField(analyzer = "autocompleteAnalyzer", name = "title_autocomplete") // todo jaso analyzer 쓰면서 사용안하게될듯
    @FullTextField(analyzer = "jasoAnalyzer", name = "title_jaso")
    @FullTextField(analyzer = "suggest_index_analyzer", searchAnalyzer = "suggest_search_analyzer")
    @GenericField(name = "title_keyword", projectable = Projectable.YES)
    @Column(length = 50, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(nullable = false)
    private String category;

    @Column(nullable = true)
    private String creator;

    @Column(nullable = false)
    private String cast;

    @Column(length = 1000, nullable = false)
    private String mainPoster;

    @Column(length = 1000, nullable = false)
    private String titlePoster;

    @Column(nullable = false)
    private int releaseDate;

    @Column(nullable = true)
    private String ageRate;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean recent;

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonManagedReference
    private List<Genre> genres = new ArrayList<>();

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonManagedReference
    private List<MediaOtt> mediaOtts = new ArrayList<>();

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonManagedReference
    private List<Bookmark> bookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Report> Reports = new ArrayList<>();

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Recommendation> recommendations = new ArrayList<>();
    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Review> reviews = new ArrayList<>();
 
      public void setId(Long id) {
        this.mediaId = id;
    }
}