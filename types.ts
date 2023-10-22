import "react";
import { User } from "@supabase/auth-helpers-nextjs";

// export enum FilmCategory {
//   MOVIE = "movie",
//   SERIES = "series",
// }

export enum FilmCategory {
  MOVIE = "movie",
  TV = "tv",
}

export enum Status {
  UNLISTED = "Unlisted",
  TO_WATCH_LATER = "Watch later",
  CURRENTLY_WATCHING = "Currently watching",
  FINISHED_WATCHING = "Finished watching",
}

// export interface OMDBSearchFilm {
//   Title: string;
//   Year: string;
//   imdbID: string;
//   Type: FilmCategory;
//   Poster: string;
// }

// export interface OMDBSearch {
//   Response: string;
//   Search?: OMDBSearchFilm[];
//   totalResults?: number;
//   Error?: string;
// }

// export interface OMDBFilm {
//   Title: string;
//   Year: string;
//   Rated: string;
//   Genre: string;
//   Director: string;
//   Actors: string;
//   Plot: string;
//   Language: string;
//   Poster: string;
//   imdbRating: string;
//   imdbID: string;
//   Type: string;
//   Response: string;
// }

export interface TMDBSearch {
  page: number;
  results: TMDBSearchFilm[];
  total_pages: number;
  total_results: number;
}

export interface TMDBSearchFilm {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  title: string;
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  popularity: boolean;
  first_air_date: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
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

// export interface Film {
//   id: string;
//   title: string;
//   poster_url: string;
//   genre?: string;
//   category?: FilmCategory;
//   year?: string;
//   language?: string;
// }

export interface Film {
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
