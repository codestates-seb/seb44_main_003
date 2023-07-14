package com.ott.server.media.service;

import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.genre.entity.Genre;
import com.ott.server.genre.repository.GenreRepository;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.dto.MultiResponseDto;
import com.ott.server.media.entity.Media;
import com.ott.server.media.mapper.MediaMapper;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.mediaott.entity.MediaOtt;
import com.ott.server.mediaott.repository.MediaOttRepository;
import com.ott.server.member.entity.Member;
import com.ott.server.recommendation.repository.RecommendationRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;
    private final MediaMapper mediaMapper;
    private final MediaOttRepository mediaOttRepository;
    private final GenreRepository genreRepository;
    private final RecommendationRepository recommendationRepository;

    public MediaService(MediaRepository mediaRepository, MediaMapper mediaMapper, MediaOttRepository mediaOttRepository, GenreRepository genreRepository, RecommendationRepository recommendationRepository) {
        this.mediaRepository = mediaRepository;
        this.mediaMapper = mediaMapper;
        this.mediaOttRepository = mediaOttRepository;
        this.genreRepository = genreRepository;
        this.recommendationRepository = recommendationRepository;
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
                .map(ottName -> { //"Netflix: www.nadnf.com/cvxcvxczv"
                    MediaOtt mediaOtt = new MediaOtt();
                    mediaOtt.setMedia(media);
                    mediaOtt.setOttName(ottName.getOttName());
                    mediaOtt.setOttAddress(ottName.getOttAddress());
                    return mediaOtt;
                })
                .collect(Collectors.toList());
        media.setMediaOtts(mediaOtts);

        Media savedMedia = mediaRepository.save(media);
        savedMedia.getGenres().forEach(genreRepository::save);
        savedMedia.getMediaOtts().forEach(mediaOttRepository::save);

        return mapMediaToResponseDto(savedMedia);
    }

    //@Cacheable("myCache")
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




    @Transactional
    public void updateMedia(Long mediaId, MediaDto.Update updateDto) {
        Media updatedMedia = mediaRepository.findByMediaId(mediaId)
                .map(media -> {
                    updateDto.getId().ifPresent(media::setId);
                    updateDto.getTitle().ifPresent(media::setTitle);
                    updateDto.getContent().ifPresent(media::setContent);
                    updateDto.getCategory().ifPresent(media::setCategory);
                    updateDto.getCreator().ifPresent(media::setCreator);
                    updateDto.getCast().ifPresent(media::setCast);
                    updateDto.getMainPoster().ifPresent(media::setMainPoster);
                    updateDto.getTitlePoster().ifPresent(media::setTitlePoster);
                    updateDto.getReleaseDate().ifPresent(media::setReleaseDate);
                    updateDto.getAgeRate().ifPresent(media::setAgeRate);
                    updateDto.getRecent().ifPresent(media::setRecent);

                    updateDto.getGenre().ifPresent(newGenre -> {
                        List<Genre> genres =
                                newGenre.stream()
                                .map(genreName -> {
                                    Genre genre = new Genre();
                                    genre.setMedia(media);
                                    genre.setGenreName(genreName);
                                    genreRepository.deleteByMedia(media);
                                    return genreRepository.save(genre);
                                })
                                .collect(Collectors.toList());
                        media.setGenres(genres);
                    });

                    updateDto.getMediaOtt().ifPresent(newMediaOtt -> {
                        List<MediaOtt> mediaOtts = newMediaOtt.stream()
                                .map(ott -> {
                                    MediaOtt mediaOtt = new MediaOtt();
                                    mediaOtt.setMedia(media);
                                    mediaOtt.setOttName(ott.getOttName());
                                    mediaOtt.setOttAddress(ott.getOttAddress());
                                    mediaOttRepository.deleteByMedia(media);
                                    return mediaOttRepository.save(mediaOtt);
                                })
                                .collect(Collectors.toList());
                        media.setMediaOtts(mediaOtts);
                    });


//                            mediaRepository.save(media);
////
//                    updatedMedia.getGenres().forEach(genreRepository::save);
//                    updatedMedia.getMediaOtts().forEach(mediaOttRepository::save);
//
                    return mediaRepository.save(media);

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


    public MediaDto.Response3 getMedia(Long mediaId) {

        return mediaRepository.findById(mediaId)
                .map(mediaMapper::toResponse3Dto)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
    } //todo mapper고치기
    public MultiResponseDto<MediaDto.Response2> getMediasAll(List<Genre> genres, List<MediaOtt> otts, Pageable pageable) {


        Page<Media> mediasPage = mediaRepository.findDistinctByGenresInAndMediaOttsIn(genres, otts, pageable);


        List<Media> medias = mediasPage.getContent();

        List<MediaDto.Response2> responses = new ArrayList<>();
        for (Media media : medias) {
            MediaDto.Response2 response = new MediaDto.Response2();
            response.setId(media.getMediaId());
            response.setTitle(media.getTitle());
            response.setMainPoster(media.getMainPoster());
            responses.add(response);
        }

        return new MultiResponseDto<>(responses, mediasPage.getNumber() + 1, mediasPage.getTotalPages());
    }



    public MultiResponseDto<MediaDto.Response2> getMedias(String category, List<Genre> genres, List<MediaOtt> otts, Pageable pageable) {
        Page<Media> mediasPage = mediaRepository.findDistinctByCategoryAndGenresInAndMediaOttsIn(category, genres, otts, pageable);

        List<Media> medias = mediasPage.getContent();

        List<MediaDto.Response2> responses = new ArrayList<>();
        for (Media media : medias) {
            MediaDto.Response2 response = new MediaDto.Response2();
            response.setId(media.getMediaId());
            response.setTitle(media.getTitle());
            response.setMainPoster(media.getMainPoster());
            responses.add(response);
        }

        return new MultiResponseDto<>(responses, mediasPage.getNumber() + 1, mediasPage.getTotalPages());
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

    @Transactional(readOnly = true)
    public Integer countRecommendByMedia(Long mediaId) {
        return mediaRepository.findRecommendCountByMediaId(mediaId);
    }

    @Transactional(readOnly = true)
    public Boolean checkBookmarkByMedia(Long mediaId) {
        Integer check = mediaRepository.checkBookmarkByMediaId(mediaId);
        if(check > 0)
            return true;
        else{
            return false;
        }
    }

    //todo 컨텐츠 검색 search 엔드포인트는 search에서 만들어서 처리

    public MultiResponseDto<MediaDto.Response2> getRecommendationsByMediaIdOrderByCount(Pageable pageable) {
        Page<Object[]> mediasPage = recommendationRepository.findRecommendCountByMediaIdOrderByCount(pageable);
        List<Object[]> medias = mediasPage.getContent();
        List<MediaDto.Response2> responses = new ArrayList<>();
        for(int i = 0; i < medias.size(); i++){
            Long mediaId = (Long) medias.get(i)[0];
            Media findMedia = findVerifiedMedia(mediaId);
            MediaDto.Response2 response = new MediaDto.Response2();
            response.setId(findMedia.getMediaId());
            response.setTitle(findMedia.getTitle());
            response.setMainPoster(findMedia.getMainPoster());
            responses.add(response);
        }
        return new MultiResponseDto<>(responses, mediasPage.getNumber() + 1, mediasPage.getTotalPages());
    }

    @Transactional(readOnly = true)
    public Media findVerifiedMedia(long mediaId) {
        Optional<Media> optionalMedia =
                mediaRepository.findById(mediaId);
        Media findMedia =
                optionalMedia.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
        return findMedia;
    }
}
