package com.ott.server.media.controller;

import com.ott.server.exception.BusinessLogicException;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.entity.Media;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.media.service.MediaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/medias")
public class MediaController {

    private final MediaService mediaService;
    private final MediaRepository mediaRepository;

    public MediaController(MediaService mediaService, MediaRepository mediaRepository) {
        this.mediaService = mediaService;
        this.mediaRepository = mediaRepository;
    }

    @PostMapping
    public ResponseEntity<MediaDto.Response> createMedia(@RequestBody MediaDto.Create createMediaDto) {
        return new ResponseEntity<>(mediaService.createMedia(createMediaDto), HttpStatus.CREATED);
    }

    @PatchMapping("/{mediaId}")
    public ResponseEntity<MediaDto.Response> updateMedia(@PathVariable Long mediaId, @RequestBody MediaDto.Update updateMediaDto) {
        return new ResponseEntity<>(mediaService.updateMedia(mediaId, updateMediaDto), HttpStatus.OK);
    }





    @GetMapping("/{mediaId}")
    public ResponseEntity<MediaDto.Response> getMedia(@PathVariable Long mediaId) {
        return new ResponseEntity<>(mediaService.getMedia(mediaId), HttpStatus.OK);
    }
    //대분류
    //localhost:8080/medias?page={page}&size={size}&genre={genre}



    //소분류

    @GetMapping("/all")
    public ResponseEntity<List<MediaDto.Response2>> getAllMedia() {
        List<MediaDto.Response2> allMedia = mediaService.getAllMedia();
        return new ResponseEntity<>(allMedia, HttpStatus.OK);
    }

    @GetMapping("/tv")
    public ResponseEntity<Page<MediaDto.Response>> getMediasByTv(
            @PathVariable String category,
            @RequestParam(required = true, defaultValue = "0") int page,
            @RequestParam(required = true, defaultValue = "10") int size,
            @RequestParam(required = true) List<String> genre,
            @RequestParam(required = true) List<String> ott) {

        Pageable pageable = PageRequest.of(page, size);
        Page<MediaDto.Response> medias = mediaService.getMedias(category, genre, ott, pageable);

        return new ResponseEntity<>(medias, HttpStatus.OK);
    } // todo 분기하여 처리하는 코드 만들예정

    @GetMapping("/movie")
    public ResponseEntity<Page<MediaDto.Response>> getMediasByMovie(
            @PathVariable String category,
            @RequestParam(required = true, defaultValue = "0") int page,
            @RequestParam(required = true, defaultValue = "10") int size,
            @RequestParam(required = true) List<String> genre,
            @RequestParam(required = true) List<String> ott) {

        Pageable pageable = PageRequest.of(page, size);
        Page<MediaDto.Response> medias = mediaService.getMedias(category, genre, ott, pageable);

        return new ResponseEntity<>(medias, HttpStatus.OK);
    } // todo 분기하여 처리하는 코드 만들예정


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
