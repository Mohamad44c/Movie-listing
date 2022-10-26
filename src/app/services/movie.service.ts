import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  // https://api.themoviedb.org/3/movie/popular?api_key=4f35139a7aeecfe122ffd50f642cd92b&language=en-US&page=1

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

  // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1

  getRecommendedMovies(movieID: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.movieApiUrl}${movieID}/recommendations?api_key=${environment.api_Key}&language=en-US&page=1`
    );
  }

  // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

  getMovieDetails(movieID: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.movieApiUrl}${movieID}?api_key=${environment.api_Key}&language=en-US&page=1`
    );
  }
}
