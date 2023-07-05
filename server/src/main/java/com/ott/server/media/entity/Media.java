package com.ott.server.media.entity;

import com.ott.server.audit.Auditable;
import com.ott.server.genre.entity.Genre;
import com.ott.server.mediaott.entity.MediaOtt;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Media extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String creator;

    @Column(nullable = false)
    private String cast;

    @Column(nullable = true)
    private String mainPoster;

    @Column(nullable = true)
    private String titlePoster;

    @Column(nullable = false)
    private int releaseDate;

    @Column(nullable = false)
    private String ageRate;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean recent;

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Genre> genres = new ArrayList<>();

    @OneToMany(mappedBy = "media", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<MediaOtt> mediaOtts = new ArrayList<>();

}