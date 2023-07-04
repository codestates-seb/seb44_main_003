package com.ott.server.memberott.entity;

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
public class MemberOtt extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberOttId;

    @Column
    private String memberOttName;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
