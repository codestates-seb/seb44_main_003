package com.ott.server.media.controller;

import com.ott.server.exception.BusinessLogicException;
import com.ott.server.media.dto.CreateOrUpdateMediaDto;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.dto.MediaResponseDto;
import com.ott.server.media.service.MediaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medias")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping
    public ResponseEntity<MediaDto> createMedia(@RequestBody CreateOrUpdateMediaDto createMediaDto) {
        return new ResponseEntity<>(mediaService.createMedia(createMediaDto), HttpStatus.CREATED);
    }

    @PatchMapping("/{mediaId}")
    public ResponseEntity<MediaDto> updateMedia(@PathVariable Long mediaId, @RequestBody CreateOrUpdateMediaDto updateMediaDto) {
        return new ResponseEntity<>(mediaService.updateMedia(mediaId, updateMediaDto), HttpStatus.OK);
    }

    @GetMapping("/{mediaId}")
    public ResponseEntity<MediaDto> getMedia(@PathVariable Long mediaId) {
        return new ResponseEntity<>(mediaService.getMedia(mediaId), HttpStatus.OK);
    }

    @GetMapping("/{category}")
    public ResponseEntity<Page<MediaResponseDto>> getMedias(
            @PathVariable String category,
            @RequestParam(required = true, defaultValue = "0") int page,
            @RequestParam(required = true, defaultValue = "10") int size,
            @RequestParam(required = true) List<String> genre,
            @RequestParam(required = true) List<String> ott) {

        Pageable pageable = PageRequest.of(page, size);
        Page<MediaResponseDto> medias = mediaService.getMedias(category, genre, ott, pageable);

        return new ResponseEntity<>(medias, HttpStatus.OK);
    }



    @DeleteMapping("/{mediaId}")
    public ResponseEntity<Void> deleteMedia(@PathVariable Long mediaId) {
        mediaService.deleteMedia(mediaId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<String> handleBusinessLogicException(BusinessLogicException ex) {
        return new ResponseEntity<>(ex.getExceptionCode().getMessage(), HttpStatus.valueOf(ex.getExceptionCode().getStatus()));
    }
}