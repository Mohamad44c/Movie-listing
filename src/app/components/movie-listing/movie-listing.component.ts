import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.css'],
})
export class MovieListingComponent implements OnInit {
  popularMovies!: Movie;
  images!: any;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getPopularMovies();
    // this.getMovieImage();
  }

  getPopularMovies() {
    this.movieService.getMovies().subscribe(
      (data) => {
        this.popularMovies = this.modifyData(data);
        console.log(this.popularMovies);
      },
      (err) => {
        console.log('Not able to get popular movies ', err);
      }
    );
  }

  getMovieImage(id: number) {
    this.movieService.getMovieImage(id).subscribe(
      (data) => {
        this.images = this.modifyData(data);
        console.log(this.popularMovies);
      },
      (err) => {
        console.log('Not able to get popular movies ', err);
      }
    );
  }

  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach((element) => {
        element.backdrop_path =
          'https://image.tmdb.org/t/p/original' +
          element.backdrop_path;
        if (!element.title) {
          element.title = element?.name;
        }
      });
    }
    return movies;
  }

}
