package com.piyushgarg.config;

import com.piyushgarg.security.FirebaseReactiveJwtTokenDecoder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {

        http
            .authorizeExchange()
                .anyExchange().authenticated()
            .and()
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtDecoder(firebaseReactiveJwtTokenDecoder())
                )
            );

        return http.build();
    }

    @Bean(name = "firebaseReactiveJwtTokenDecoder")
    public ReactiveJwtDecoder firebaseReactiveJwtTokenDecoder() {

        return new FirebaseReactiveJwtTokenDecoder();
    }
}