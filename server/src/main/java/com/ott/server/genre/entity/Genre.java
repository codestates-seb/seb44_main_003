package com.ott.server.genre.entity;

import com.ott.server.audit.Auditable;
import com.ott.server.media.entity.Media;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Genre extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long genreId;

    @ManyToOne
    @JoinColumn(name = "MEDIA_ID")
    private Media media;

    @Column(name = "genre_name")
    private String genreName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_modified_at")
    private LocalDateTime lastModifiedAt;
}

