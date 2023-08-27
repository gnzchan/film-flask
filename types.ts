import { User } from "@supabase/auth-helpers-nextjs";

export enum FilmCategory {
  Movie = "movie",
  Series = "series",
}

export interface SearchFilm {
  Title: string;
  Year: string;
  imdbID: string;
  Type: FilmCategory;
  Poster: string;
}

export interface Search {
  Response: boolean;
  Search: SearchFilm[];
  totalResults: number;
  Error?: string;
}

export interface Film {
  actors: string;
  category: FilmCategory;
  date_released: string;
  genre: string;
  id: string;
  imdb_rating: number;
  imdb_votes: number;
  plot: string;
  poster_url: string;
  title: string;
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
