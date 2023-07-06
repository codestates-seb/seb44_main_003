package com.ott.server.member.controller;

import com.ott.server.dto.SingleResponseDto;
import com.ott.server.exception.BusinessLogicException;
import com.ott.server.interest.entity.Interest;
import com.ott.server.interest.repository.InterestRepository;
import com.ott.server.member.dto.MemberDto;
import com.ott.server.member.entity.Member;
import com.ott.server.member.mapper.MemberMapper;
import com.ott.server.member.service.MemberService;
import com.ott.server.memberott.entity.MemberOtt;
import com.ott.server.memberott.repository.MemberOttRepository;
import com.ott.server.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final MemberOttRepository memberOttRepository;
    private final InterestRepository interestRepository;

    public MemberController(MemberService memberService, MemberMapper memberMapper,
                            MemberOttRepository memberOttRepository,
                            InterestRepository interestRepository) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.memberOttRepository = memberOttRepository;
        this.interestRepository = interestRepository;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody){
        Member member = memberMapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        String[] otts = requestBody.getOtt();
        for(int i = 0; i < otts.length; i++){
            MemberOtt memberOtt = new MemberOtt();
            memberOtt.setMember(member);
            memberOtt.setMemberOttName(otts[i]);

            memberOttRepository.save(memberOtt);
        }
        String[] interests = requestBody.getInterest();
        for(int i = 0; i < interests.length; i++){
            Interest interest = new Interest();
            interest.setMember(member);
            interest.setInterestName(interests[i]);

            interestRepository.save(interest);
        }

        return ResponseEntity.created(location).build();
    }

    @PatchMapping
    public ResponseEntity patchMember(
            @Valid @RequestBody MemberDto.Patch requestBody,
            Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMemberByEmail(email);

        requestBody.setMemberId(member.getMemberId());

        Member updatedMember =
                memberService.updateMember(memberMapper.memberPatchToMember(requestBody));

        List<MemberOtt> memberOtts = memberOttRepository.findByMember(member);
        for(int i = 0; i < memberOtts.size(); i++){
            memberOttRepository.delete(memberOtts.get(i));
        }

        String[] otts = requestBody.getOtt();
        for(int i = 0; i < otts.length; i++){
            MemberOtt memberOtt = new MemberOtt();
            memberOtt.setMember(member);
            memberOtt.setMemberOttName(otts[i]);

            memberOttRepository.save(memberOtt);
        }

        List<Interest> memberInterests = interestRepository.findByMember(member);
        for(int i = 0; i < memberInterests.size(); i++){
            interestRepository.delete(memberInterests.get(i));
        }

        String[] interests = requestBody.getInterest();
        for(int i = 0; i < interests.length; i++){
            Interest interest = new Interest();
            interest.setMember(member);
            interest.setInterestName(interests[i]);

            interestRepository.save(interest);
        }

        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberResponse(updatedMember)),
                HttpStatus.OK);
    }

    @GetMapping("/detail")
    public ResponseEntity getMember(
            Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMemberByEmail(email);
        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberResponse(member))
                , HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteMember(
            Authentication authentication) {
        String email = authentication.getPrincipal().toString();
        Member member = memberService.findMemberByEmail(email);

        memberService.deleteMember(member.getMemberId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
