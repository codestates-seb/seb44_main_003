package com.ott.server.helper.event;

import com.ott.server.member.entity.Member;
import lombok.Getter;

@Getter
public class MemberRegistrationApplicationEvent {
    private Member member;

    public MemberRegistrationApplicationEvent(Member member){
        this.member = member;
    }
}
