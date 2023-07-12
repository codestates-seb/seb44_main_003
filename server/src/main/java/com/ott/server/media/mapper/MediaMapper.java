package com.ott.server.media.mapper;

import com.ott.server.genre.entity.Genre;
import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.entity.Media;
import com.ott.server.mediaott.entity.MediaOtt;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface MediaMapper {



    @Mapping(source = "genres", target = "genre")
    @Mapping(source = "mediaOtts", target = "mediaOtt")
    MediaDto.Response3 toResponse3Dto(Media media);

    default String fromGenre(Genre genre) {
        return genre.getGenreName();
    }



    default String fromMediaOtt(MediaOtt mediaOtt) {
        return mediaOtt.getOttName();
    }



    default List<String> fromGenreList(List<Genre> genres) {
        if (genres == null) {
            return null;
        }
        return genres.stream()
                .map(this::fromGenre)
                .collect(Collectors.toList());
    }



    default List<String> fromMediaOttList(List<MediaOtt> mediaOtts) {
        if (mediaOtts == null) {
            return null;
        }
        return mediaOtts.stream()
                .map(this::fromMediaOtt)
                .collect(Collectors.toList());
    }



}



//참고: MediaMapperImpl에서 에러가 발생한다면 다시 빌드 할것