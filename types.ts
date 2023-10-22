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
// export interface TMDBFilmMovie {
//   adult: boolean;
//   backdrop_path: string;
//   belongs_to_collection: {
//     id: number;
//     name: string;
//     poster_path: string;
//     backdrop_path: string;
//   };
//   budget: number;
//   category: FilmCategory;
//   genres: { id: number; name: string }[];
//   homepage: string;
//   id: number;
//   imdb_id: string;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   production_companies: {
//     id: number;
//     logo_path: string;
//     name: string;
//     origin_country: string;
//   }[];
//   production_countries: { iso_3166_1: string; name: string }[];
//   release_date: string;
//   revenue: number;
//   runtime: number;
//   spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
//   status: string;
//   tagline: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

// export interface TMDBFilmTV {
//   adult: boolean;
//   backdrop_path: string;
//   category: FilmCategory;
//   created_by: [];
//   episode_run_time: number[];
//   first_air_date: string;
//   genres: {
//     id: number;
//     name: string;
//   }[];
//   homepage: string;
//   id: number;
//   in_production: false;
//   languages: string[];
//   last_air_date: string;
//   last_episode_to_air: {
//     id: number;
//     name: string;
//     overview: string;
//     vote_average: number;
//     vote_count: number;
//     air_date: string;
//     episode_number: number;
//     episode_type: string;
//     production_code: string;
//     runtime: number;
//     season_number: number;
//     show_id: number;
//     still_path: string;
//   };
//   name: string;
//   next_episode_to_air: {
//     id: number;
//     name: string;
//     overview: string;
//     vote_average: number;
//     vote_count: number;
//     air_date: string;
//     episode_number: number;
//     episode_type: string;
//     production_code: string;
//     runtime: number;
//     season_number: number;
//     show_id: number;
//     still_path: string;
//   };
//   networks: {
//     id: number;
//     logo_path: string;
//     name: string;
//     origin_country: string;
//   }[];
//   number_of_episodes: number;
//   number_of_seasons: number;
//   origin_country: string[];
//   original_language: string;
//   original_name: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   production_companies: {
//     id: number;
//     logo_path: string;
//     name: string;
//     origin_country: string;
//   }[];
//   production_countries: {
//     iso_3166_1: string;
//     name: string;
//   }[];
//   seasons: {
//     air_date: string;
//     episode_count: number;
//     id: number;
//     name: string;
//     overview: string;
//     poster_path: string;
//     season_number: number;
//     vote_average: number;
//   }[];
//   spoken_languages: {
//     english_name: string;
//     iso_639_1: string;
//     name: string;
//   }[];
//   status: string;
//   tagline: string;
//   type: string;
//   vote_average: number;
//   vote_count: number;
// }

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
