package com.ott.server.media.entity;

import com.ott.server.audit.Auditable;

import javax.persistence.*;


@Entity
public class Media extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @ManyToMany
    @JoinTable(
            name = "media_genre",
            joinColumns = @JoinColumn(name = "media_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genre> genre;

    @ManyToMany
    @JoinTable(
            name = "media_ott",
            joinColumns = @JoinColumn(name = "media_id"),
            inverseJoinColumns = @JoinColumn(name = "ott_id")
    )
    private List<MediaOtt> mediaOtt;
}