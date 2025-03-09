package com.example.movies_app.util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppUtil {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
