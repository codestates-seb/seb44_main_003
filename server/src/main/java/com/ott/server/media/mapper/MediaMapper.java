package com.ott.server.media.mapper;

import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.entity.Media;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface MediaMapper {

    @Mapping(source = "mediaId", target = "id", ignore = true) // 무시하도록 설정
    @Mapping(source = "genres", target = "genre")
    @Mapping(source = "mediaOtts", target = "mediaOtt")
    MediaDto.Create toCreateDto(Media media);

    @Mapping(source = "id", target = "mediaId")
    @Mapping(source = "genre", target = "genres")
    @Mapping(source = "mediaOtt", target = "mediaOtts")
    Media toEntityFromCreateDto(MediaDto.Create createDto);

    @Mapping(source = "mediaId", target = "id")
    @Mapping(source = "genres", target = "genre")
    @Mapping(source = "mediaOtts", target = "mediaOtt")
    MediaDto.Update toUpdateDto(Media media);

    @Mapping(source = "id", target = "mediaId")
    @Mapping(source = "genre", target = "genres")
    @Mapping(source = "mediaOtt", target = "mediaOtts")
    void updateFromDto(MediaDto.Update updateDto, @MappingTarget Media media);

    @Mapping(source = "mediaId", target = "id")
    MediaDto.Response toResponseDto(Media media);
}



//참고: MediaMapperImpl에서 에러가 발생한다면 다시 빌드 할것