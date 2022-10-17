import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  private movieApiUrl =
    'https://imdb8.p.rapidapi.com/title/v2/find?title=game&titleType=movie&limit=20&sortArg=moviemeter%2Casc&keyword=action';

  getMovieList(): Observable<Movie[]> {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '98f692ba40mshfc304c4d83f8757p13bd79jsne01a09877682',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
      },
    };
    console.log(this.http.get<Movie[]>(this.movieApiUrl, options));
    return this.http.get<Movie[]>(this.movieApiUrl, options);
  }
}
