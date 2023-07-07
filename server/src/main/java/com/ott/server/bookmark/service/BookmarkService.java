package com.ott.server.bookmark.service;

import com.ott.server.bookmark.dto.BookmarkDto;
import com.ott.server.bookmark.entity.Bookmark;
import com.ott.server.bookmark.repository.BookmarkRepository;
import com.ott.server.exception.BusinessLogicException;
import com.ott.server.exception.ExceptionCode;
import com.ott.server.media.entity.Media;
import com.ott.server.media.repository.MediaRepository;
import com.ott.server.member.entity.Member;
import com.ott.server.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final MemberRepository memberRepository;
    private final MediaRepository mediaRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository, MemberRepository memberRepository, MediaRepository mediaRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.memberRepository = memberRepository;
        this.mediaRepository = mediaRepository;
    }

    public void createOrDeleteBookmark(BookmarkDto.Post bookmarkDto){
        Member member = memberRepository.findById(bookmarkDto.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Media media = mediaRepository.findById(bookmarkDto.getMediaId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEDIA_NOT_FOUND));
        Bookmark existingBookmark = bookmarkRepository.findByMemberAndMedia(member, media);

        if(existingBookmark != null) {
            bookmarkRepository.delete(existingBookmark);
        }
        else{
            Bookmark bookmark = new Bookmark();
            bookmark.setMember(member);
            bookmark.setMedia(media);
            bookmarkRepository.save(bookmark);
        }
    }

    @Transactional
    public Bookmark findBookmark(long bookmarkId){
        Bookmark findBookmark = findVerifiedBookmark(bookmarkId);
        return findBookmark;
    }

    public void deleteBookmark(long bookmarkId) {
        Bookmark findBookmark = findVerifiedBookmark(bookmarkId);
        bookmarkRepository.delete(findBookmark);
    }

    @Transactional
    private Bookmark findVerifiedBookmark(long bookmarkId) {
        Optional<Bookmark> optionalBookmark = bookmarkRepository.findById(bookmarkId);
        Bookmark findBookmark =
                optionalBookmark.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));
        return findBookmark;
    }
}
