package com.ott.server.report.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ott.server.audit.Auditable;
import com.ott.server.media.entity.Media;
import com.ott.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.C;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Report extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column()
    private Boolean completion;
    @JoinColumn(name = "MEMBER_ID")
    @ManyToOne
    @JsonBackReference
    private Member member;
    @JoinColumn(name = "MEDIA_ID")
    @ManyToOne
    @JsonBackReference
    private Media media;
}
