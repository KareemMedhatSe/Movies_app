package com.example.movies_app.service;

import com.example.movies_app.dto.MovieDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OmdbService {
    private final String BASE_URL = "http://www.omdbapi.com/";
    private final String API_KEY = "4ca1acf0";
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public OmdbService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public List<MovieDto> searchMovies(String searchTerm) {
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("apikey", API_KEY)
                .queryParam("s", searchTerm)
                .toUriString();
        String response = restTemplate.getForObject(url, String.class);
        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode searchNode = root.has("Search") ? root.get("Search") : root.get("search");
            if (searchNode == null || !searchNode.isArray()) {
                return Collections.emptyList();
            }
            return StreamSupport.stream(searchNode.spliterator(), false)
                    .map(node -> objectMapper.convertValue(node, MovieDto.class))
                    .collect(Collectors.toList());

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
