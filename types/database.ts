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
          author: string; // optional legacy field; prefer author_id + join
          author_id: string | null;
          likes: number;
          phase: string;
          outcome: string;
          categories: string[];
          date: string; // published date
          event_date: string | null; // legacy
          actual_event_date: string | null; // sort key
          image_url: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          summary: string;
          content: string;
          author?: string;
          author_id?: string | null;
          likes?: number;
          phase: string;
          outcome: string;
          categories: string[];
          date: string;
          event_date?: string | null;
          actual_event_date?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          summary?: string;
          content?: string;
          author?: string;
          author_id?: string | null;
          likes?: number;
          phase?: string;
          outcome?: string;
          categories?: string[];
          date?: string;
          event_date?: string | null;
          actual_event_date?: string | null;
          image_url?: string | null;
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