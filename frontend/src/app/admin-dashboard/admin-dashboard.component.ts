import { Component } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../interface/movie.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [FormsModule,CommonModule]
})
export class AdminDashboardComponent {
  searchTerm: string = '';
  movies: Movie[] = [];
  savedMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  searchMovies() {
    this.movieService.searchMovies(this.searchTerm).subscribe({
      next: (response) => {
        this.movies = response.map((movie: any) => ({
          Title: movie.Title || "Unknown",
          Year: movie.Year || "Unknown",
          Poster: movie.Poster || null,
          Type:movie.Type || "movie",
        })); 
      },
      error: (error) => {
        console.error("Error fetching movies:", error);
      }
    });
  }

  
  addMovie(movie: Movie) {
    this.movieService.addMovie(movie).subscribe(() => {
      this.fetchSavedMovies();
    });
  }

 deleteMovie(Title: string) {
    this.movieService.deleteMovie(Title).subscribe(() => {
      this.fetchSavedMovies(); 
    });
  }

  fetchSavedMovies() {
    this.movieService.getSavedMovies().subscribe({
      next: (response) => {
        this.savedMovies = response; 
      },
      error: (error) => {
        console.error("Error fetching saved movies:", error);
      }
    });
  }
  logout() {
    localStorage.removeItem('token'); 
    window.location.href = '/login';  
  }
  ngOnInit() {
    this.fetchSavedMovies();
  }
}
