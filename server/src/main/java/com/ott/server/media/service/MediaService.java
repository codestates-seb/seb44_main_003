package com.ott.server.media.service;

import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.genre.entity.Genre;
import com.ott.server.genre.repository.GenreRepository;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.entity.Media;
import com.ott.server.media.mapper.MediaMapper;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.mediaott.entity.MediaOtt;
import com.ott.server.mediaott.repository.MediaOttRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;
    private final MediaMapper mediaMapper;
    private final MediaOttRepository mediaOttRepository;
    private final GenreRepository genreRepository;

    public MediaService(MediaRepository mediaRepository, MediaMapper mediaMapper, MediaOttRepository mediaOttRepository, GenreRepository genreRepository) {
        this.mediaRepository = mediaRepository;
        this.mediaMapper = mediaMapper;
        this.mediaOttRepository = mediaOttRepository;
        this.genreRepository = genreRepository;
    }


    public MediaDto.Response createMedia(MediaDto.Create createDto) {
        Media media = new Media();
        media.setTitle(createDto.getTitle());
        media.setContent(createDto.getContent());
        media.setCategory(createDto.getCategory());
        media.setCreator(createDto.getCreator());
        media.setCast(createDto.getCast());
        media.setMainPoster(createDto.getMainPoster());
        media.setTitlePoster(createDto.getTitlePoster());
        media.setReleaseDate(createDto.getReleaseDate());
        media.setAgeRate(createDto.getAgeRate());
        media.setRecent(createDto.getRecent());

        List<Genre> genres = createDto.getGenre().stream()
                .map(genreName -> {
                    Genre genre = new Genre();
                    genre.setMedia(media);
                    genre.setGenreName(genreName);
                    return genre;
                })
                .collect(Collectors.toList());
        media.setGenres(genres);

        List<MediaOtt> mediaOtts = createDto.getMediaOtt().stream()
                .map(ottName -> {
                    MediaOtt mediaOtt = new MediaOtt();
                    mediaOtt.setMedia(media);
                    mediaOtt.setOttName(ottName);
                    return mediaOtt;
                })
                .collect(Collectors.toList());
        media.setMediaOtts(mediaOtts);

        Media savedMedia = mediaRepository.save(media);
        savedMedia.getGenres().forEach(genreRepository::save);
        savedMedia.getMediaOtts().forEach(mediaOttRepository::save);

        return mapMediaToResponseDto(savedMedia);
    }

    public List<MediaDto.Response2> getAllMedia() {
        List<Media> allMedia = mediaRepository.findAll();

        List<MediaDto.Response2> allMediaResponseDto = new ArrayList<>();
        for (Media media : allMedia) {
            MediaDto.Response2 responseDto = new MediaDto.Response2();

            responseDto.setId(media.getMediaId());
            responseDto.setTitle(media.getTitle());
            responseDto.setMainPoster(media.getMainPoster());



            allMediaResponseDto.add(responseDto);
        }

        return allMediaResponseDto;
    }



    public MediaDto.Response updateMedia(Long mediaId, MediaDto.Update updateDto) {
        return mediaRepository.findById(mediaId)
                .map(media -> {
                    // Update the media based on updateDto...
                    media.setTitle(updateDto.getTitle());
                    media.setContent(updateDto.getContent());
                    media.setCategory(updateDto.getCategory());
                    media.setCreator(updateDto.getCreator());
                    media.setCast(updateDto.getCast());
                    media.setMainPoster(updateDto.getMainPoster());
                    media.setTitlePoster(updateDto.getTitlePoster());
                    media.setReleaseDate(updateDto.getReleaseDate());
                    media.setAgeRate(updateDto.getAgeRate());
                    media.setRecent(updateDto.getRecent());

                    List<Genre> genres = updateDto.getGenre().stream()
                            .map(genreName -> {
                                Genre genre = new Genre();
                                genre.setMedia(media);
                                genre.setGenreName(genreName);
                                return genre;
                            })
                            .collect(Collectors.toList());
                    media.setGenres(genres);

                    List<MediaOtt> mediaOtts = updateDto.getMediaOtt().stream()
                            .map(ottName -> {
                                MediaOtt mediaOtt = new MediaOtt();
                                mediaOtt.setMedia(media);
                                mediaOtt.setOttName(ottName);
                                return mediaOtt;
                            })
                            .collect(Collectors.toList());
                    media.setMediaOtts(mediaOtts);

                    Media updatedMedia = mediaRepository.save(media);
                    updatedMedia.getGenres().forEach(genreRepository::save);
                    updatedMedia.getMediaOtts().forEach(mediaOttRepository::save);

                    return mapMediaToResponseDto(updatedMedia);
                })
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
    }

    private MediaDto.Response mapMediaToResponseDto(Media media) {
        List<String> genreNames = media.getGenres().stream()
                .map(Genre::getGenreName)
                .collect(Collectors.toList());

        List<String> ottNames = media.getMediaOtts().stream()
                .map(MediaOtt::getOttName)
                .collect(Collectors.toList());

        return new MediaDto.Response(
                media.getMediaId(),
                media.getTitle(),
                media.getMainPoster(),
                genreNames,
                ottNames
        );
    }


    public MediaDto.Response getMedia(Long mediaId) {
        return mediaRepository.findById(mediaId)
                .map(mediaMapper::toResponseDto)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
    } //todo mapper고치기


    public Page<MediaDto.Response> getMedias(String category, List<String> genre, List<String> ott, Pageable pageable) {
//        Page<Media> medias = mediaRepository.findByCategoryAndGenreAndOtt(category, genre, ott, pageable);
//
//        Page<MediaDto.Response> mediasResponseDto = medias.map(mediaMapper::toResponseDto);

        return null;//mediasResponseDto;
    }


    public void deleteMedia(Long mediaId) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        if (authentication == null || !authentication.isAuthenticated()) {
//            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
//        } //todo 시큐리티 활성화시 동작됨 401 에러 코드, api 명세서에선 401 에러코드가 정의되어 있지 않음 수정필요.

        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));

        mediaRepository.delete(media);
    }

    //todo 컨텐츠 검색 search 엔드포인트는 search에서 만들어서 처리

}
