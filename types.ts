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
  MOVIE = "movie",
  SERIES = "series",
}

export enum Status {
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
  Search: OMDBSearchFilm[];
  totalResults: number;
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

export interface Review {
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
