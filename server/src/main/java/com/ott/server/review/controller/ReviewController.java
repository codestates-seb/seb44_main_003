package com.ott.server.review.controller;


import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.review.dto.*;
import com.ott.server.review.entity.Review;
import com.ott.server.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }
    @PostMapping
    public ResponseEntity createReview(@RequestBody ReviewCreateDto request, Authentication authentication) {
        try {
            reviewService.save(request, authentication);
            return new ResponseEntity( HttpStatus.CREATED);
        } catch (BusinessLogicException e) {
            if (e.getMessage().equals(ExceptionCode.INVALID_REVIEW_FORMAT.getMessage())) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.valueOf(ExceptionCode.INVALID_REVIEW_FORMAT.getStatus()));
            }
            if (e.getMessage().equals(ExceptionCode.INVALID_AUTHORIZATION.getMessage())) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.valueOf(ExceptionCode.INVALID_AUTHORIZATION.getStatus()));
            }

            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/{id}")
    public ResponseEntity<ReviewDto> getReview(@PathVariable Long id) {
        return reviewService.findById(id)
                .map(review -> new ResponseEntity(review, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity("후기를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReviewDto>> getAllReviews(@RequestParam(required = false, defaultValue = "1") int page,
                                                         @RequestParam(required = false, defaultValue = "10") int size,
                                                         Authentication authentication) {
        return new ResponseEntity(reviewService.findAll(page-1, size, authentication), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody ReviewUpdateDto newReviewData,
                                               Authentication authentication) {
        reviewService.update(id, newReviewData, authentication);
        return new ResponseEntity( HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id, Authentication authentication) {
        reviewService.delete(id, authentication);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<MultiResponseDto> getReviewsByMediaId(@RequestParam Long mediaId,
                                                                @RequestParam(required = false, defaultValue = "1") int page,
                                                                @RequestParam(required = false, defaultValue = "10") int size) {
        MultiResponseDto response = reviewService.findByMediaId(mediaId, page-1, size);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping("/me")
    public ResponseEntity<MediaMultiResponseDto> getReviewsByMemberId(Authentication authentication,
                                                                @RequestParam(required = false, defaultValue = "1") int page,
                                                                @RequestParam(required = false, defaultValue = "10") int size) {

        MediaMultiResponseDto response = reviewService.findByMemberId(authentication, page-1, size);
        return new ResponseEntity<>(response, HttpStatus.OK);


    }

}

