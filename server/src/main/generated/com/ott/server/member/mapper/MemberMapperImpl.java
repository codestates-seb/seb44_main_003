package com.ott.server.member.mapper;

import com.ott.server.interest.dto.InterestDto;
import com.ott.server.interest.entity.Interest;
import com.ott.server.member.dto.MemberDto;
import com.ott.server.member.entity.Member;
import com.ott.server.memberott.dto.MemberOttDto;
import com.ott.server.memberott.entity.MemberOtt;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-11T14:41:34+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Oracle Corporation)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostToMember(MemberDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.nickname( requestBody.getNickname() );
        member.email( requestBody.getEmail() );
        member.password( requestBody.getPassword() );
        member.avatarUri( requestBody.getAvatarUri() );
        member.category( requestBody.getCategory() );

        return member.build();
    }

    @Override
    public Member memberPatchToMember(MemberDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.memberId( requestBody.getMemberId() );
        member.nickname( requestBody.getNickname() );
        member.avatarUri( requestBody.getAvatarUri() );
        member.category( requestBody.getCategory() );

        return member.build();
    }

    @Override
    public MemberDto.Response memberToMemberResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        List<MemberOttDto.Response> memberOtts = null;
        List<InterestDto.Response> interests = null;
        String nickname = null;
        String avatarUri = null;
        LocalDateTime createdAt = null;

        memberOtts = memberOttListToResponseList( member.getMemberOtts() );
        interests = interestListToResponseList( member.getInterests() );
        nickname = member.getNickname();
        avatarUri = member.getAvatarUri();
        createdAt = member.getCreatedAt();

        MemberDto.Response response = new MemberDto.Response( nickname, avatarUri, createdAt, memberOtts, interests );

        return response;
    }

    @Override
    public List<MemberDto.Response> membersToMemberResponses(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<MemberDto.Response> list = new ArrayList<MemberDto.Response>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberResponse( member ) );
        }

        return list;
    }

    protected MemberOttDto.Response memberOttToResponse(MemberOtt memberOtt) {
        if ( memberOtt == null ) {
            return null;
        }

        String memberOttName = null;

        memberOttName = memberOtt.getMemberOttName();

        MemberOttDto.Response response = new MemberOttDto.Response( memberOttName );

        return response;
    }

    protected List<MemberOttDto.Response> memberOttListToResponseList(List<MemberOtt> list) {
        if ( list == null ) {
            return null;
        }

        List<MemberOttDto.Response> list1 = new ArrayList<MemberOttDto.Response>( list.size() );
        for ( MemberOtt memberOtt : list ) {
            list1.add( memberOttToResponse( memberOtt ) );
        }

        return list1;
    }

    protected InterestDto.Response interestToResponse(Interest interest) {
        if ( interest == null ) {
            return null;
        }

        String interestName = null;

        interestName = interest.getInterestName();

        InterestDto.Response response = new InterestDto.Response( interestName );

        return response;
    }

    protected List<InterestDto.Response> interestListToResponseList(List<Interest> list) {
        if ( list == null ) {
            return null;
        }

        List<InterestDto.Response> list1 = new ArrayList<InterestDto.Response>( list.size() );
        for ( Interest interest : list ) {
            list1.add( interestToResponse( interest ) );
        }

        return list1;
    }
}
