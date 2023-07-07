package com.ott.server.recommendation.controller;


import com.ott.server.member.entity.Member;
import com.ott.server.member.service.MemberService;
import com.ott.server.recommendation.dto.RecommendationDto;
import com.ott.server.recommendation.service.RecommendationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/recommend")
@Validated
@Slf4j
public class RecommendationController {
    private final RecommendationService recommendationService;
    private final MemberService memberService;

    public RecommendationController(RecommendationService recommendationService, MemberService memberService) {
        this.recommendationService = recommendationService;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postRecommendation(@Valid @RequestBody RecommendationDto.Post requestBody, Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMemberByEmail(email);
        requestBody.setMemberId(member.getMemberId());
        recommendationService.createOrDeleteRecommendation(requestBody);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
