package com.ott.server.bookmark.controller;

import com.ott.server.bookmark.dto.BookmarkDto;
import com.ott.server.bookmark.service.BookmarkService;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.entity.Media;
import com.ott.server.member.entity.Member;
import com.ott.server.member.service.MemberService;
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
@RequestMapping("/bookmarks")
@Validated
@Slf4j
public class BookmarkController {
    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @PostMapping
    public ResponseEntity postBookmark(@Valid @RequestBody BookmarkDto.Post requestBody, Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        bookmarkService.createOrDeleteBookmark(requestBody, email);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<MediaDto.Response2>> getBookmarks(Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        List<Media> bookmarkedMedia = bookmarkService.getBookmarksForUser(email);
        List<MediaDto.Response2> mediaDtoList = bookmarkedMedia.stream()
                .map(media -> new MediaDto.Response2(media.getMediaId(), media.getTitle(), media.getMainPoster()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(mediaDtoList);
    }

    @GetMapping("/{mediaId}")
    public ResponseEntity<Boolean> isMediaBookmarked(@PathVariable Long mediaId, Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        boolean isBookmarked = bookmarkService.isMediaBookmarkedForUser(mediaId, email);
        return ResponseEntity.ok(isBookmarked);
    }
}
