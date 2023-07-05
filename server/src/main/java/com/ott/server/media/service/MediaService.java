package com.ott.server.media.service;

import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.genre.entity.Genre;
import com.ott.server.genre.repository.GenreRepository;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.dto.MediaResponseDto;
import com.ott.server.media.entity.Media;
import com.ott.server.media.mapper.MediaMapper;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.mediaott.entity.MediaOtt;
import com.ott.server.mediaott.repository.MediaOttRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

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




    public MediaDto.Response createMedia(MediaDto.Create createMediaDto) {
        Media media = mediaMapper.toEntityFromCreateDto(createMediaDto);
        Media savedMedia = mediaRepository.save(media);

        List<MediaOtt> otts = createMediaDto.getMediaOtt();
        for(MediaOtt ott : otts){
            MediaOtt mediaOtt = new MediaOtt();
            mediaOtt.setMedia(savedMedia);
            mediaOtt.setOttName(ott.getOttName());

            mediaOttRepository.save(mediaOtt);
        }

        List<Genre> genres = createMediaDto.getGenre();
        for(Genre genre : genres){
            Genre genreEntity = new Genre();
            genreEntity.setMedia(savedMedia);
            genreEntity.setGenreName(genre.getGenreName());

            genreRepository.save(genreEntity);
        }

        return mediaMapper.toResponseDto(savedMedia);
    }

    public MediaDto.Response updateMedia(Long mediaId, MediaDto.Update updateMediaDto) {
        return mediaRepository.findById(mediaId)
                .map(media -> {
                    mediaMapper.updateFromDto(updateMediaDto, media);
                    Media updatedMedia = mediaRepository.save(media);

                    mediaOttRepository.deleteByMedia(media);
                    genreRepository.deleteByMedia(media);

                    List<MediaOtt> otts = updateMediaDto.getMediaOtt();
                    for(MediaOtt ott : otts){
                        MediaOtt mediaOtt = new MediaOtt();
                        mediaOtt.setMedia(updatedMedia);
                        mediaOtt.setOttName(ott.getOttName());

                        mediaOttRepository.save(mediaOtt);
                    }

                    List<Genre> genres = updateMediaDto.getGenre();
                    for(Genre genre : genres){
                        Genre genreEntity = new Genre();
                        genreEntity.setMedia(updatedMedia);
                        genreEntity.setGenreName(genre.getGenreName());

                        genreRepository.save(genreEntity);
                    }

                    return mediaMapper.toResponseDto(updatedMedia);
                })
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
    }

    public MediaDto.Response getMedia(Long mediaId) {
        return mediaRepository.findById(mediaId)
                .map(mediaMapper::toResponseDto)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
    }


    public Page<MediaDto.Response> getMedias(String category, List<String> genre, List<String> ott, Pageable pageable) {
        //Page<Media> medias = mediaRepository.findByCategoryAndGenreAndOtt(category, genre, ott, pageable);

        //Page<MediaDto.Response> mediasResponseDto = medias.map(mediaMapper::toResponseDto);

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
