package com.ott.server.interest.repository;

import com.ott.server.interest.entity.Interest;
import com.ott.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, Long> {
    List<Interest> findByMember(Member member);
}
