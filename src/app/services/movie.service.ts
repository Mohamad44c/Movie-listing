import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieApiUrl: string = '';

  constructor(private http: HttpClient) {
    this.movieApiUrl = 'https://api.themoviedb.org/3/movie/';
  }

  getPopularMovies(): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.movieApiUrl}popular?api_key=${environment.api_Key}&language=en-US&page=1`
    );
  }

  getTopRatedMovies(): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.movieApiUrl}top_rated?api_key=${environment.api_Key}&language=en-US&page=1`
    );
  }

  getUpcomingMovies(): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.movieApiUrl}upcoming?api_key=${environment.api_Key}&language=en-US&page=1`
    );
  }

  getRecommendedMovies(movieID: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.movieApiUrl}${movieID}/recommendations?api_key=${environment.api_Key}&language=en-US&page=1`
    );
  }

  getMovieDetails(movieID: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.movieApiUrl}${movieID}?api_key=${environment.api_Key}&language=en-US&page=1`
    );
  }
}
