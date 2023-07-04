package com.ott.server.bookmark.controller;

import com.ott.server.bookmark.dto.BookmarkDto;
import com.ott.server.bookmark.service.BookmarkService;
import com.ott.server.member.entity.Member;
import com.ott.server.member.service.MemberService;
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
@RequestMapping("/bookmarks")
@Validated
@Slf4j
public class BookmarkController {
    private final BookmarkService bookmarkService;
    private final MemberService memberService;

    public BookmarkController(BookmarkService bookmarkService, MemberService memberService) {
        this.bookmarkService = bookmarkService;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postBookmark(@Valid @RequestBody BookmarkDto.Post requestBody, Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMemberByEmail(email);
        requestBody.setMemberId(member.getMemberId());
        bookmarkService.createOrDeleteBookmark(requestBody);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
