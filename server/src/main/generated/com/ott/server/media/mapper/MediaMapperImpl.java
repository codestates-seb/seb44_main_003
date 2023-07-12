package com.ott.server.media.mapper;

import com.ott.server.media.dto.MediaDto;
import com.ott.server.media.entity.Media;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-12T09:23:00+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Oracle Corporation)"
)
@Component
public class MediaMapperImpl implements MediaMapper {

    @Override
    public MediaDto.Response toResponseDto(Media media) {
        if ( media == null ) {
            return null;
        }

        MediaDto.Response response = new MediaDto.Response();

        response.setId( media.getMediaId() );
        response.setGenre( fromGenreList( media.getGenres() ) );
        response.setMediaOtt( fromMediaOttList( media.getMediaOtts() ) );
        response.setTitle( media.getTitle() );
        response.setMainPoster( media.getMainPoster() );

        return response;
    }

    @Override
    public MediaDto.Response3 toResponse3Dto(Media media) {
        if ( media == null ) {
            return null;
        }

        MediaDto.Response3 response3 = new MediaDto.Response3();

        if ( media.getMediaId() != null ) {
            response3.setTitle( String.valueOf( media.getMediaId() ) );
        }
        response3.setGenre( fromGenreList( media.getGenres() ) );
        response3.setMediaOtt( fromMediaOttList( media.getMediaOtts() ) );
        response3.setContent( media.getContent() );
        response3.setCategory( media.getCategory() );
        response3.setCreator( media.getCreator() );
        response3.setCast( media.getCast() );
        response3.setMainPoster( media.getMainPoster() );
        response3.setTitlePoster( media.getTitlePoster() );
        response3.setReleaseDate( media.getReleaseDate() );
        response3.setAgeRate( media.getAgeRate() );
        response3.setRecent( media.getRecent() );

        return response3;
    }
}
