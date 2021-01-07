package com.piyushgarg.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
public class FirebaseReactiveJwtTokenDecoder implements ReactiveJwtDecoder {

    @Autowired
    private JwtDecoder jwtDecoder;

    @Override
    public Mono<Jwt> decode(String token) throws JwtException {

        return Mono.just(token)
            .map(jwtDecoder::decode)
            .doOnError(e -> log.error("An error occurred while attempting to decode the Jwt: ", e));
    }
}
