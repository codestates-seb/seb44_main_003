package com.ott.server.bookmark.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class BookmarkDto {
    @Getter
    public static class Post {
        private Long mediaId;
        private Long memberId;
        public void setMemberId(Long memberId){
            this.memberId = memberId;
        }
    }
}
