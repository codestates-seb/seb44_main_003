package com.ott.server.media.mapper;

import com.ott.server.media.dto.CreateOrUpdateMediaDto;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.dto.MediaResponseDto;
import com.ott.server.media.entity.Media;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface MediaMapper {
    MediaDto toDto(Media media);
    Media toEntity(CreateOrUpdateMediaDto createOrUpdateMediaDto);
    void updateFromDto(CreateOrUpdateMediaDto createOrUpdateMediaDto, @MappingTarget Media media);
    MediaResponseDto toResponseDto(Media media);
}

//참고: MediaMapperImpl에서 에러가 발생한다면 다시 빌드 할것