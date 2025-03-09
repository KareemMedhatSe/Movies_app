package com.example.movies_app.controller;

import com.example.movies_app.dto.MovieDto;
import com.example.movies_app.model.Movie;
import com.example.movies_app.service.MovieService;
import com.example.movies_app.service.OmdbService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final OmdbService omdbService;
    private final MovieService movieService;

    public MovieController(OmdbService omdbService, MovieService movieService) {
        this.omdbService = omdbService;
        this.movieService = movieService;
    }
    @GetMapping("/search")
    public List<MovieDto> searchMovies(@RequestParam String searchTerm) {
        return omdbService.searchMovies(searchTerm);
    }
    @PostMapping("/save")
    public ResponseEntity<?> saveMovie(@RequestBody MovieDto movieDto) {
        if (movieDto == null || movieDto.getTitle() == null) {
            return ResponseEntity.badRequest().body("Invalid movie data received.");
        }
        Movie savedMovie = movieService.saveMovie(movieDto);
        return ResponseEntity.ok(savedMovie);
    }
    @GetMapping("/saved")
    public ResponseEntity<List<MovieDto>> getSavedMovies() {
        List<MovieDto> movieDtos = movieService.getSavedMovies().stream()
                .map(movie -> new MovieDto(
                        movie.getTitle(),
                        movie.getYear(),
                        movie.getType(),
                        movie.getPoster()

                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(movieDtos);

    }

    @DeleteMapping("/delete/{title}")
    public ResponseEntity<Void> deleteMovie(@PathVariable String title) {
        movieService.deleteMovie(title);
        return ResponseEntity.noContent().build();
    }
}
