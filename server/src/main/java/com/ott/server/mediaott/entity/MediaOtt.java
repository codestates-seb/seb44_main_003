package com.ott.server.mediaott.entity;

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
public class MediaOtt extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaOttId;

    @ManyToOne
    @JoinColumn(name = "MEDIA_ID")
    private Media media;

    @Column(name = "ott_name")
    private String ottName;

}
