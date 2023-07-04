package com.ott.server.mediaott.entity;

import com.ott.server.media.entity.Media;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class MediaOtt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(mappedBy = "mediaOtt")
    private List<Media> media;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Column(name = "last_modified_at")
    private LocalDateTime last_modified_at;
}
