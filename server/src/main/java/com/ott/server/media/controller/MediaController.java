package com.ott.server.media.controller;

import com.ott.server.exception.BusinessLogicException;
import com.ott.server.genre.entity.Genre;
import com.ott.server.genre.repository.GenreRepository;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.entity.Media;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.media.service.MediaService;
import com.ott.server.mediaott.entity.MediaOtt;
import com.ott.server.mediaott.repository.MediaOttRepository;
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
    private final MediaRepository mediaRepository;
    private final GenreRepository genreRepository;
    private final MediaOttRepository ottRepository;

    public MediaController(MediaService mediaService, MediaRepository mediaRepository, GenreRepository genreRepository, MediaOttRepository ottRepository) {
        this.mediaService = mediaService;
        this.mediaRepository = mediaRepository;
        this.genreRepository = genreRepository;
        this.ottRepository = ottRepository;
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
    public ResponseEntity<MediaDto.Response3> getMedia(@PathVariable Long mediaId) {
        MediaDto.Response3 media = mediaService.getMedia(mediaId);
        media.setCountRecommend(mediaService.countRecommendByMedia(mediaId));
        media.setCheckBookmark(mediaService.checkBookmarkByMedia(mediaId));
        return new ResponseEntity<>(media, HttpStatus.OK);
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
    public ResponseEntity<List<MediaDto.Response2>> getMediasByTv(
            @RequestParam(required = true, defaultValue = "1") int page,
            @RequestParam(required = true, defaultValue = "10") int size,
            @RequestParam(required = true) List<String> genreNames,
            @RequestParam List<String> ottNames) {

        Pageable pageable = PageRequest.of(page - 1, size);
        List<Genre> genres = genreRepository.findByGenreNameIn(genreNames);
        List<MediaOtt> otts = ottRepository.findByOttNameIn(ottNames);

        List<MediaDto.Response2> medias = mediaService.getMedias("TV", genres, otts, pageable);

        return new ResponseEntity<>(medias, HttpStatus.OK);
    }

    @GetMapping("/movie")
    public ResponseEntity<List<MediaDto.Response2>> getMediasByMovie(
            @RequestParam(required = true, defaultValue = "1") int page,
            @RequestParam(required = true, defaultValue = "10") int size,
            @RequestParam(required = true) List<String> genreNames,
            @RequestParam List<String> ottNames) {

        Pageable pageable = PageRequest.of(page - 1, size);
        List<Genre> genres = genreRepository.findByGenreNameIn(genreNames);
        List<MediaOtt> otts = ottRepository.findByOttNameIn(ottNames);

        List<MediaDto.Response2> medias = mediaService.getMedias("movie", genres, otts, pageable);

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
