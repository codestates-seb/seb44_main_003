package com.ott.server.recommendation.controller;


import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.entity.Media;
import com.ott.server.member.entity.Member;
import com.ott.server.member.service.MemberService;
import com.ott.server.recommendation.dto.RecommendationDto;
import com.ott.server.recommendation.service.RecommendationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

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
        recommendationService.createOrDeleteRecommendation(requestBody, email);
        return new ResponseEntity<>(HttpStatus.CREATED);  // API 명세에 따라 201로 변경
    }

    @GetMapping
    public ResponseEntity<List<MediaDto.Response2>> getRecommendations(Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        List<Media> recommendedMedia = recommendationService.getRecommendationsForUser(email);
        List<MediaDto.Response2> mediaDtoList = recommendedMedia.stream()
                .map(media -> new MediaDto.Response2(media.getMediaId(), media.getTitle(), media.getMainPoster()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(mediaDtoList);
    }

    @GetMapping("/{mediaId}")
    public ResponseEntity<Boolean> isMediaRecommended(@PathVariable Long mediaId, Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        boolean isRecommended = recommendationService.isMediaRecommendedForUser(mediaId, email);
        return ResponseEntity.ok(isRecommended);
    }




}
