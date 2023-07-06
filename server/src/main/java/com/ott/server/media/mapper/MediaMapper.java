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
//
//    @Mapping(source = "mediaId", target = "id")
//    @Mapping(source = "genres", target = "genre")
//    @Mapping(source = "mediaOtts", target = "mediaOtt")
//    MediaDto.Create toCreateDto(Media media);
//
//    @Mapping(source = "id", target = "mediaId")
//    @Mapping(source = "genre", target = "genres")
//    @Mapping(source = "mediaOtt", target = "mediaOtts")
//    Media toEntityFromCreateDto(MediaDto.Create createDto);
//
//    @Mapping(source = "mediaId", target = "id")
//    @Mapping(source = "genres", target = "genre")
//    @Mapping(source = "mediaOtts", target = "mediaOtt")
//    MediaDto.Update toUpdateDto(Media media);
//
//    @Mapping(source = "id", target = "mediaId")
//    @Mapping(source = "genre", target = "genres")
//    @Mapping(source = "mediaOtt", target = "mediaOtts")
//    void updateFromDto(MediaDto.Update updateDto, @MappingTarget Media media);

    @Mapping(source = "mediaId", target = "id")
    @Mapping(source = "genres", target = "genre")
    @Mapping(source = "mediaOtts", target = "mediaOtt")
    MediaDto.Response toResponseDto(Media media);

    @Mapping(source = "mediaId", target = "title")
    @Mapping(source = "genres", target = "genre")
    @Mapping(source = "mediaOtts", target = "mediaOtt")
    MediaDto.Response3 toResponse3Dto(Media media);
    default String fromGenre(Genre genre) {
        return genre.getGenreName();
    }

    default Genre fromStringToGenre(String genreName) {
        Genre genre = new Genre();
        genre.setMedia(null); // You need to set Media object here
        genre.setGenreName(genreName);
        return genre;
    }

    default String fromMediaOtt(MediaOtt mediaOtt) {
        return mediaOtt.getOttName();
    }

    default MediaOtt fromStringToMediaOtt(String ottName) {
        MediaOtt mediaOtt = new MediaOtt();
        mediaOtt.setMedia(null); // You need to set Media object here
        mediaOtt.setOttName(ottName);
        return mediaOtt;
    }

    default List<String> fromGenreList(List<Genre> genres) {
        if (genres == null) {
            return null;
        }
        return genres.stream()
                .map(this::fromGenre)
                .collect(Collectors.toList());
    }

    default List<Genre> fromStringListToGenreList(List<String> genreNames) {
        if (genreNames == null) {
            return null;
        }
        return genreNames.stream()
                .map(this::fromStringToGenre)
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

    default List<MediaOtt> fromStringListToMediaOttList(List<String> ottNames) {
        if (ottNames == null) {
            return null;
        }
        return ottNames.stream()
                .map(this::fromStringToMediaOtt)
                .collect(Collectors.toList());
    }

}



//참고: MediaMapperImpl에서 에러가 발생한다면 다시 빌드 할것