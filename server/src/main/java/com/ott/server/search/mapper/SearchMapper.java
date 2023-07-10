package com.ott.server.search.mapper;

import com.ott.server.media.dto.MediaResponseDto;
import com.ott.server.media.entity.Media;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SearchMapper {
    @Mapping(source = "mediaId", target = "id")
    MediaResponseDto mediaToMediaResponseDto(Media media);
    List<MediaResponseDto> mediasToMediaResponseDtos(List<Media> medias);
}
