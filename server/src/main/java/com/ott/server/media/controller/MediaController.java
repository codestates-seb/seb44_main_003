
package com.ott.server.media.controller;

import com.ott.server.exception.BusinessLogicException;
import com.ott.server.genre.entity.Genre;
import com.ott.server.genre.repository.GenreRepository;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.dto.MultiResponseDto;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.media.service.MediaService;
import com.ott.server.mediaott.entity.MediaOtt;
import com.ott.server.mediaott.repository.MediaOttRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
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

    @PatchMapping("/{mediaId}") //todo 완료
    public ResponseEntity updateMedia(@PathVariable Long mediaId, @RequestBody(required = false) MediaDto.Update updateMediaDto) {
        mediaService.updateMedia(mediaId, updateMediaDto);
        return new ResponseEntity(HttpStatus.OK);
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
    //@Cacheable("myCache")
    public ResponseEntity<List<MediaDto.Response2>> getAllMedia() {
        List<MediaDto.Response2> allMedia = mediaService.getAllMedia();
        return new ResponseEntity<>(allMedia, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<MultiResponseDto> getMedias(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "1000") int size,
            @RequestParam(required = false) List<String> genre,
            @RequestParam(required = false) List<String> ott) {

        if (genre == null || genre.isEmpty()) {
            genre = Arrays.asList("액션","드라마","SF","스릴러","애니메이션","코미디","가족","판타지","로맨스","공포","범죄","스포츠","음악","Made in Europe","Reality TV","역사","다큐멘터리","전쟁","서부");
        }

        if (ott == null || ott.isEmpty()) {
            ott = Arrays.asList("Disney Plus","Watcha","Netflix","wavve");
        }

        Pageable pageable = PageRequest.of(page - 1, size);
        List<Genre> genres = genreRepository.findByGenreNameIn(genre);
        List<MediaOtt> otts = ottRepository.findByOttNameIn(ott);

        MultiResponseDto medias = mediaService.getMediasAll(genres, otts, pageable);

        return new ResponseEntity<>(medias, HttpStatus.OK);
    }


    @GetMapping("/tv")
    public ResponseEntity<MultiResponseDto> getMediasByTv(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "1000") int size,
            @RequestParam(required = false) List<String> genre,
            @RequestParam(required = false) List<String> ott) {

        if (genre == null || genre.isEmpty()) {
            genre = Arrays.asList("액션","드라마","SF","스릴러","애니메이션","코미디","가족","판타지","로맨스","공포","범죄","스포츠","음악","Made in Europe","Reality TV","역사","다큐멘터리","전쟁","서부");
        }

        if (ott == null || ott.isEmpty()) {
            ott = Arrays.asList("Disney Plus","Watcha","Netflix","wavve");
        }

        Pageable pageable = PageRequest.of(page - 1, size);
        List<Genre> genres = genreRepository.findByGenreNameIn(genre);
        List<MediaOtt> otts = ottRepository.findByOttNameIn(ott);

        MultiResponseDto medias = mediaService.getMedias("TV", genres, otts, pageable);

        return new ResponseEntity<>(medias, HttpStatus.OK);
    }


    @GetMapping("/movie")
    public ResponseEntity<MultiResponseDto> getMediasByMovie(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "1000") int size,
            @RequestParam(required = false) List<String> genre,
            @RequestParam(required = false) List<String> ott) {

        if (genre == null || genre.isEmpty()) {
            genre = Arrays.asList("액션","드라마","SF","스릴러","애니메이션","코미디","가족","판타지","로맨스","공포","범죄","스포츠","음악","Made in Europe","Reality TV","역사","다큐멘터리","전쟁","서부");
        }

        if (ott == null || ott.isEmpty()) {
            ott = Arrays.asList("Disney Plus","Watcha","Netflix","wavve");
        }

        Pageable pageable = PageRequest.of(page - 1, size);
        List<Genre> genres = genreRepository.findByGenreNameIn(genre);
        List<MediaOtt> otts = ottRepository.findByOttNameIn(ott);

        MultiResponseDto medias = mediaService.getMedias("영화", genres, otts, pageable);

        return new ResponseEntity<>(medias, HttpStatus.OK);
    }

    @GetMapping("/recommendation")
    public ResponseEntity<MultiResponseDto> getMediasByRecommendation(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "1000") int size,
            @RequestParam(required = false) String ottName) {
        Pageable pageable = PageRequest.of(page - 1, size);
        MultiResponseDto medias = mediaService.findMediaByOttNameOrderByRecommendationCount(ottName, pageable);


        return new ResponseEntity<>(medias, HttpStatus.OK);
    }

//    @GetMapping("/recommendation")
//    public ResponseEntity<MultiResponseDto> getMediasByRecommendation(
//            @RequestParam(required = false, defaultValue = "1") int page,
//            @RequestParam(required = false, defaultValue = "1000") int size) {
//        Pageable pageable = PageRequest.of(page - 1, size);
//        MultiResponseDto medias = mediaService.getRecommendationsByMediaIdOrderByCount(pageable);
//
//
//        return new ResponseEntity<>(medias, HttpStatus.OK);
//    }


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