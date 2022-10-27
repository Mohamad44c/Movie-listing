import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  movieID!: number;
  recommendedMovies!: Movie;
  movieDetails!: Movie;

  ngOnInit(): void {
    let id: number = 0;
    this.route.params.subscribe((params) => {
      id = params['id'];
      this.getMovieDetails(id);
      this.getRecommendedMovies(id);
      // console.log('The id of this route is: ', id);
    });
  }

  getMovieDetails(id: number) {
    this.movieService
      .getRecommendedMovies(id)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.movieDetails = this.modifyData(data);
          console.log(this.movieDetails);
        },
        (err) => {
          console.log(
            'Movie detail service ' + 'Not able to get movie details',
            err
          );
        }
      );
  }

  getRecommendedMovies(id: number) {
    this.movieService.getRecommendedMovies(id).subscribe(
      (data) => {
        this.recommendedMovies = this.modifyData(data);
        // console.log(this.recommendedMovies);
      },
      (err) => {
        console.log(
          'Recommended Movie service ' + 'Not able to get Recommended movies ',
          err
        );
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
