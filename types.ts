import "react";
import { User } from "@supabase/auth-helpers-nextjs";

export enum FilmCategory {
  MOVIE = "movie",
  SERIES = "series",
}

export enum Status {
  UNLISTED = "Unlisted",
  TO_WATCH_LATER = "Watch later",
  CURRENTLY_WATCHING = "Currently watching",
  FINISHED_WATCHING = "Finished watching",
}

export interface OMDBSearchFilm {
  Title: string;
  Year: string;
  imdbID: string;
  Type: FilmCategory;
  Poster: string;
}

export interface OMDBSearch {
  Response: string;
  Search?: OMDBSearchFilm[];
  totalResults?: number;
  Error?: string;
}

export interface OMDBFilm {
  Title: string;
  Year: string;
  Rated: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
  Type: string;
  Response: string;
}

export interface TMDBSearch {
  page: number;
  results: TMDBSearchFilm[];
  total_pages: number;
  total_results: number;
}

export interface TMDBSearchFilm {
  adult: boolean;
  backdrop_path: string;
  // "/sN5cqyipK3OJnTFLcLnwD9CPXCe.jpg";
  id: number;
  // 204243;
  name: string;
  // "Robot";
  title: string;
  original_language: string;
  // "en";
  original_name: string;
  original_title: string;
  // "Robot";
  overview: string;
  poster_path: string;
  // "/46nFEPK36LxpdW58ixiHBglzTnG.jpg";
  media_type: string;
  //  "tv";
  genre_ids: number[];
  // [18];
  popularity: boolean;
  // 1.4;
  first_air_date: string;
  // "2021-12-24";
  release_date: string;
  // "2016-01-27",
  vote_average: number;
  // 0;
  vote_count: number;
  //  0;
  origin_country: string[];
  // ["IN"];
}

export interface Review {
  user_id: string;
  review: string;
  image_path: File[];
  created_at: string;
  updated_at: string;
  users: UserDetails;
}

export interface ImageReview {
  user_id: string;
  users: UserDetails;
  image_path: string;
}

export interface CommentReview {
  user_id: string;
  review: string;
  created_at: string;
  updated_at: string;
  users: UserDetails;
}

export interface Film {
  id: string;
  title: string;
  poster_url: string;
  genre?: string;
  category?: FilmCategory;
  year?: string;
  language?: string;
}

export interface TMDBFilm {
  id: number;
  title: string;
  poster_url: string;
  category: string;
  year?: string;
  language?: string;
}

export type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export interface UserDetails {
  id: string;
  full_name?: string;
  avatar_url?: string;
}
