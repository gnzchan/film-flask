export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      films: {
        Row: {
          category: Database["public"]["Enums"]["category"] | null
          created_at: string | null
          id: string
          title: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["category"] | null
          created_at?: string | null
          id: string
          title?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["category"] | null
          created_at?: string | null
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      image_films: {
        Row: {
          film_id: string
          image_path: string
          user_id: string
        }
        Insert: {
          film_id: string
          image_path: string
          user_id: string
        }
        Update: {
          film_id?: string
          image_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "image_films_film_id_fkey"
            columns: ["film_id"]
            isOneToOne: false
            referencedRelation: "films"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_films_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      liked_films: {
        Row: {
          created_at: string | null
          film_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          film_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          film_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "liked_films_film_id_fkey"
            columns: ["film_id"]
            isOneToOne: false
            referencedRelation: "films"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "liked_films_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      review_films: {
        Row: {
          created_at: string | null
          film_id: string
          review: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          film_id: string
          review?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          film_id?: string
          review?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_films_film_id_fkey"
            columns: ["film_id"]
            isOneToOne: false
            referencedRelation: "films"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_films_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      status_films: {
        Row: {
          date_finished: string | null
          film_id: string
          status: Database["public"]["Enums"]["status"] | null
          user_id: string
        }
        Insert: {
          date_finished?: string | null
          film_id: string
          status?: Database["public"]["Enums"]["status"] | null
          user_id: string
        }
        Update: {
          date_finished?: string | null
          film_id?: string
          status?: Database["public"]["Enums"]["status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "status_films_film_id_fkey"
            columns: ["film_id"]
            isOneToOne: false
            referencedRelation: "films"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "status_films_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      category: "movie" | "tv"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      status: "Watch later" | "Currently watching" | "Finished watching"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
