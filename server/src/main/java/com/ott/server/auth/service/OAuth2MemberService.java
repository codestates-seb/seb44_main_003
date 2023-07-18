package com.ott.server.auth.service;

import com.ott.server.auth.attribute.OAuthAttributes;
import com.ott.server.auth.userdetails.SessionMember;
import com.ott.server.member.entity.Member;
import com.ott.server.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


@Service
public class OAuth2MemberService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    private final HttpSession httpSession;
    @Autowired
    public OAuth2MemberService(MemberRepository memberRepository, HttpSession httpSession) {
        this.memberRepository = memberRepository;
        this.httpSession = httpSession;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest memberRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest,OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oauthMember = delegate.loadUser(memberRequest);

        String registrationId = memberRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = memberRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oauthMember.getAttributes());

        Member member = saveOrUpdate(attributes);

        httpSession.setAttribute("member", new SessionMember(member));

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("USER")),
                attributes.getAttributes(),
                "email"
        );


    }

    private Member saveOrUpdate(OAuthAttributes attributes) {
        Member member = memberRepository.findByEmail(attributes.getEmail())
                .orElse(attributes.toEntity());

        return memberRepository.save(member);
    }
}
