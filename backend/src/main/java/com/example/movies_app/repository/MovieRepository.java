package com.example.movies_app.repository;

import com.example.movies_app.model.Movie;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {
    List<Movie> findByTitleContainingIgnoreCase(String title);
    @Transactional
    @Modifying
    @Query("DELETE FROM Movie m WHERE m.title = :title")
    void deleteByTitle(String title);
}