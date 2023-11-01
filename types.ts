import "react";
import { User } from "@supabase/auth-helpers-nextjs";

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
export interface TMDBFilm {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  category: FilmCategory;
  created_by: [];
  episode_run_time: number[];
  first_air_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  in_production: false;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  next_episode_to_air: {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  type: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface CreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: string;
  character: string;
  credit_id: string;
  order: number;
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
  id: number;
  name: string;
  title: string;
  category: FilmCategory;
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}
export interface Review {
  review: string;
  image_path: File[];
  created_at: string;
  updated_at: string;
  user: UserDetails;
}

export interface ImageReview {
  user: UserDetails;
  image_path: string;
}

export interface CommentReview {
  review: string;
  created_at: string;
  updated_at: string;
  user: UserDetails;
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
