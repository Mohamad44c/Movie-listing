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
  topRatedMovies!: Movie;
  upComingMovies!: Movie;
  images!: any;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getUpcoming();
  }

  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe(
      (data) => {
        this.popularMovies = this.modifyData(data);
        console.log(this.popularMovies);
      },
      (err) => {
        console.log('Popular Movies ' + 'Not able to get popular movies ', err);
      }
    );
  }

  getTopRatedMovies() {
    this.movieService.getTopRatedMovies().subscribe(
      (data) => {
        this.topRatedMovies = this.modifyData(data);
        console.log('top rated movies ' + this.topRatedMovies);
      },
      (err) => {
        console.log('Not able to get top rated movies ', err);
      }
    );
  }

  getUpcoming() {
    this.movieService.getUpcomingMovies().subscribe(
      (data) => {
        this.upComingMovies = this.modifyData(data);
        console.log('upcoming movies ' + this.upComingMovies);
      },
      (err) => {
        console.log('Not able to get upcoming movies ', err);
      }
    );
  }

  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach((element) => {
        element.backdrop_path =
          'https://image.tmdb.org/t/p/original' + element.backdrop_path;
        if (!element.title) {
          element.title = element?.name;
        }
      });
    }
    return movies;
  }
}
