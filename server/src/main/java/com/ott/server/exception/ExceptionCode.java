package com.ott.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다"),
    MEMBER_EXISTS(409, "이미 존재하는 회원입니다"),
    INVALID_EMAIL(400, "유효하지 않은 이메일 형식입니다"),
    INVALID_NICKNAME(400, "닉네임이 유효하지 않습니다"),
    EMAIL_DUPLICATION(400, "이메일이 중복입니다"),
    INVALID_PASSWORD(400, "비밀번호가 유효하지 않습니다"),
    INVALID_TOKEN(400, "유효하지 않은 토큰입니다"),
    LOGIN_FAILED(401, "로그인에 실패하였습니다. 사용자 이름 또는 비밀번호를 확인해주세요"),
    INVALID_MEMBER_STATUS(400, "유효하지 않은 회원 상태입니다"),
    INVALID_REVIEW_FORMAT(400, "유효하지 않은 후기입니다"),
    REVIEW_NOT_FOUND(404, "후기를 찾을 수 없습니다"),
    INVALID_VOTE_FORMAT(400, "유효하지 않은 투표 형식입니다"),
    VOTE_NOT_FOUND(404, "투표를 찾을 수 없습니다"),
    INVALID_TAG_FORMAT(400, "유효하지 않은 태그 형식입니다"),
    TAG_NOT_FOUND(404, "태그를 찾을 수 없습니다"),
    BOOKMARK_NOT_FOUND(404, "찜을 찾을 수 없습니다"),
    RECOMMEND_NOT_FOUND(404, "추천을 찾을 수 없습니다"),
    MEDIA_NOT_FOUND(404, "컨텐츠를 찾을 수 없습니다"),
    INVALID_AUTHORIZATION(401, "권한이 없습니다"),

    REPORT_NOT_FOUND(404, "제보를 찾을 수 없습니다");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}