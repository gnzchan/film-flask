export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      commented_films: {
        Row: {
          comment: string | null;
          film_id: string;
          user_id: string;
        };
        Insert: {
          comment?: string | null;
          film_id: string;
          user_id: string;
        };
        Update: {
          comment?: string | null;
          film_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "commented_films_film_id_fkey";
            columns: ["film_id"];
            referencedRelation: "films";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "commented_films_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      films: {
        Row: {
          actors: string | null;
          category: Database["public"]["Enums"]["category"] | null;
          date_released: string | null;
          genre: string | null;
          id: string;
          imdb_rating: number | null;
          imdb_votes: number | null;
          plot: string | null;
          poster_url: string | null;
          title: string | null;
        };
        Insert: {
          actors?: string | null;
          category?: Database["public"]["Enums"]["category"] | null;
          date_released?: string | null;
          genre?: string | null;
          id?: string;
          imdb_rating?: number | null;
          imdb_votes?: number | null;
          plot?: string | null;
          poster_url?: string | null;
          title?: string | null;
        };
        Update: {
          actors?: string | null;
          category?: Database["public"]["Enums"]["category"] | null;
          date_released?: string | null;
          genre?: string | null;
          id?: string;
          imdb_rating?: number | null;
          imdb_votes?: number | null;
          plot?: string | null;
          poster_url?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      liked_films: {
        Row: {
          created_at: string | null;
          film_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          film_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          film_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "liked_films_film_id_fkey";
            columns: ["film_id"];
            referencedRelation: "films";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "liked_films_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      category: "movie" | "series";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
