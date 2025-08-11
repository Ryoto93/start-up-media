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
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          title: string;
          summary: string;
          content: string;
          author: string;
          likes: number;
          phase: string;
          outcome: string;
          categories: string[];
          date: string;
          image_url: string | null;
          event_date: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          summary: string;
          content: string;
          author: string;
          likes?: number;
          phase: string;
          outcome: string;
          categories: string[];
          date: string;
          image_url?: string | null;
          event_date?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          summary?: string;
          content?: string;
          author?: string;
          likes?: number;
          phase?: string;
          outcome?: string;
          categories?: string[];
          date?: string;
          image_url?: string | null;
          event_date?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
} 