import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../interface/movie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class UserDashboardComponent implements OnInit {
  savedMovies: Movie[] = [];
  showDetailsMap: { [title: string]: boolean } = {};
  selectedMovie: Movie | null = null;
  searchTerm: string = '';
  currentPage: number = 1;
  moviesPerPage: number = 5;
  constructor(private movieService: MovieService) {}
  getFilteredMoviesCount(): number {
    return this.savedMovies.filter(movie =>
      movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).length;
  }
  paginatedMovies(): Movie[] {
    return this.savedMovies
      .filter(movie => movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice((this.currentPage - 1) * this.moviesPerPage, this.currentPage * this.moviesPerPage);
  }
   nextPage() {
    if (this.currentPage * this.moviesPerPage < this.getFilteredMoviesCount()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  fetchSavedMovies() {
    this.movieService.getSavedMovies().subscribe({
      next: (response) => {
        console.log("Saved Movies:", response);
        this.savedMovies = response;
      },
      error: (error) => {
        console.error("Error fetching saved movies:", error);
      }
    });
  }
   
  toggleDetails(title: string) {
    this.selectedMovie = this.savedMovies.find(movie => movie.Title === title) || null;
  }
  logout() {
    localStorage.removeItem('token'); 
    window.location.href = '/login';  
  }
  
  filteredMovies() {
    return this.savedMovies.filter(movie => 
      movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
 
  
  ngOnInit() {
    this.movieService.getSavedMovies().subscribe((response) => {
      this.savedMovies = response;
    });
  }
}
