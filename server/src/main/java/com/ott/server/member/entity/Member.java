package com.ott.server.member.entity;

import com.ott.server.audit.Auditable;
import com.ott.server.bookmark.entity.Bookmark;
import com.ott.server.interest.entity.Interest;
import com.ott.server.memberott.entity.MemberOtt;
import com.ott.server.recommendation.entity.Recommendation;
import com.ott.server.review.entity.Review;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 30, nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = true)
    private String password;

    @Column(length = 10, nullable = false)
    @Size(min = 2)
    private String nickname;

    @Column(length = 200, nullable = true)
    private String avatarUri;

    @Column(length = 100, nullable = true)
    private String category;

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Recommendation> recommendations = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Bookmark> bookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Interest> interests = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<MemberOtt> memberOtts = new ArrayList<>();
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Builder
    public Member(Long memberId, String nickname, String email, String password, String avatarUri, String category, List<String> roles) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.avatarUri = avatarUri;
        this.category = category;
        this.roles = roles;
    }
    public Member update(String nickname){
        this.nickname = nickname;
        return this;
    }

    public Member(String email) {
        this.email = email;
    }
}
