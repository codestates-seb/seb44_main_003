package com.ott.server.media.service;

import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.media.dto.CreateOrUpdateMediaDto;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.dto.MediaResponseDto;
import com.ott.server.media.entity.Media;
import com.ott.server.media.mapper.MediaMapper;
import com.ott.server.media.repository.MediaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;
    private final MediaMapper mediaMapper;

    public MediaService(MediaRepository mediaRepository, MediaMapper mediaMapper) {
        this.mediaRepository = mediaRepository;
        this.mediaMapper = mediaMapper;
    }

    public MediaDto createMedia(CreateOrUpdateMediaDto createMediaDto) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

//        if (authentication == null || !authentication.isAuthenticated()) {
//            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
//        } //todo 시큐리티 활성화시 동작됨 401 에러 코드

        Media media = mediaMapper.toEntity(createMediaDto);
        Media savedMedia = mediaRepository.save(media);
        return mediaMapper.toDto(savedMedia);
    }

    public MediaDto updateMedia(Long mediaId, CreateOrUpdateMediaDto updateMediaDto) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        if (authentication == null || !authentication.isAuthenticated()) {
//            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
//        } //todo 시큐리티 활성화시 동작됨 401 에러 코드

        return mediaRepository.findById(mediaId)
                .map(media -> {
                    mediaMapper.updateFromDto(updateMediaDto, media);
                    return mediaMapper.toDto(mediaRepository.save(media));
                })
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
    }

    public MediaDto getMedia(Long mediaId) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        if (authentication == null || !authentication.isAuthenticated()) {
//            throw new BusinessLogicException(ExceptionCode.INVALID_AUTHORIZATION);
//        } //todo 시큐리티 활성화시 동작됨 401 에러 코드
        //todo review 서비스 먼저 구현뒤에
        //  review[]{
        //                 “id”: int,
        //                 “content” : String,
        //                 “createdAt”: Datetime,
        //                 “lastModifiedAt”: Datetime
        //                 member{
        //                                  “nickname”: String,
        //                                  “avatarUri”: String
        //                 }
        //    } 이거 추가할것 현재 반환데이터는 위의 데이터 뺴고 반환되도록 되어있음
        return mediaRepository.findById(mediaId)
                .map(mediaMapper::toDto)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
    }

    public Page<MediaResponseDto> getMedias(String category, List<String> genre, List<String> ott, Pageable pageable) {
        Page<Media> medias = mediaRepository.findByCategoryAndGenreAndOtt(category, genre, ott, pageable);

        Page<MediaResponseDto> mediasResponseDto = medias.map(mediaMapper::toResponseDto);

        return mediasResponseDto;
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
