import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interface/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8091/api/movies';

  constructor(private http: HttpClient) {}
  searchMovies(searchTerm: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search?searchTerm=${searchTerm}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    const moviePayload = {
      Title: movie.Title,   
      Year: movie.Year,
      Poster: movie.Poster,
      Type:movie.Type
    };
    return this.http.post<Movie>(`${this.apiUrl}/save`, moviePayload);
  }

  getSavedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:8091/api/movies/saved');
  }
  

  deleteMovie(Title: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${Title}`);
  }
}
