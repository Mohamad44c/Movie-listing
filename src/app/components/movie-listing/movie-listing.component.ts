import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.css'],
})
export class MovieListingComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  movies: Movie[] = [];

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe((data) => (this.movies = data));
    console.log(this.movies);
  }
}
