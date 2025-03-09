package com.example.movies_app.service;

import com.example.movies_app.dto.MovieDto;
import com.example.movies_app.model.Movie;
import com.example.movies_app.repository.MovieRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie saveMovie(MovieDto movieDto) {

        Movie movie = new Movie();
        movie.setTitle(movieDto.getTitle());
        movie.setYear(movieDto.getYear());
        movie.setPoster(movieDto.getPoster());
        movie.setType(movieDto.getType());
        movie.setPoster(movieDto.getPoster()!=null?movieDto.getPoster() : "N/A");
        return movieRepository.save(movie);
    }

    public List<Movie> getSavedMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(String imdbID) {
        return movieRepository.findById(imdbID);
    }
    public List<Movie> searchMovies(String searchTerm) {
        List<Movie> movies = movieRepository.findByTitleContainingIgnoreCase(searchTerm);
        return movies;
    }
    @Transactional
    public void deleteMovie(String title) {
        movieRepository.deleteByTitle(title);
    }

}
