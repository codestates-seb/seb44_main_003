package com.ott.server.memberott.repository;

import com.ott.server.member.entity.Member;
import com.ott.server.memberott.entity.MemberOtt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberOttRepository extends JpaRepository<MemberOtt, Long> {
    List<MemberOtt> findByMember(Member member);
}
