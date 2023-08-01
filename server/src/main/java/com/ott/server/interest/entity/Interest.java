package com.ott.server.interest.entity;


import com.ott.server.audit.Auditable;
import com.ott.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Interest extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interestId;

    @Column
    private String interestName;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
