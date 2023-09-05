import "react";
import { User } from "@supabase/auth-helpers-nextjs";

export type LordIconTrigger =
  | "hover"
  | "click"
  | "loop"
  | "loop-on-hover"
  | "morph"
  | "morph-two-way";

export type LordIconColors = {
  primary?: string;
  secondary?: string;
};

type LordIconProps = {
  src?: string;
  trigger?: LordIconTrigger;
  delay?: string | number;
  colors?: string;
  style?: { width?: number; height?: number };
};

type LordIconElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  LordIconProps;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": LordIconElement;
    }
  }
}

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
  Response: string;
  Search: SearchFilm[];
  totalResults: number;
  Error?: string;
}

export interface FilmDetails {
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
