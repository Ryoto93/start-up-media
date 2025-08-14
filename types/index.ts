// Database型のインポート
export type { Database } from './database';

// フェーズの型定義
export type Phase = '起業検討期' | '直前・直後' | '開始期' | '成長期';

// 成果の型定義
export type OutcomeType = '成功体験' | '失敗体験' | 'その他';

// ビジネス領域の型定義
export type BusinessArea = '営業' | 'マーケティング' | '事業計画' | '経理' | '開発' | '雑務';

// データベースのテーブル型から派生したプロフィール型
export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
  created_at: string;
  updated_at: string | null;
}

// プロフィール詳細（UIで利用される拡張フィールドを含む）
export interface ProfileDetails extends Profile {
  age?: number | null;
  career?: string | null;
  bio?: string | null;
  consideration_start_date?: string | null;
  entrepreneurship_start_date?: string | null;
}

// 著者プロフィール（レガシー互換用）
export interface AuthorProfile {
  name: string;
  age: number;
  career: string;
  bio: string;
  avatar: string;
  entrepreneurshipStartDate: string;
  entrepreneurshipConsiderationStartDate: string;
}

// データベースのテーブル型から派生した記事型
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  author_id: string | null;
  likes: number;
  phase: Phase;
  outcome: OutcomeType;
  categories: BusinessArea[];
  date: string; // published date
  event_date: string | null; // legacy
  actual_event_date: string | null; // actual event date
  image_url: string | null;
  created_at: string;
  updated_at: string | null;
}

// UI用の記事型（プロフィール情報を結合）
export interface ArticleWithProfile extends Article {
  authorProfile?: ProfileDetails;
}

// フィルター状態の型定義
export interface FilterState {
  phase: Phase | '';
  outcome: OutcomeType | '';
  categories: BusinessArea[];
  searchKeyword: string;
  sortBy: 'date' | 'actual_event_date' | 'likes' | 'popular' | 'newest';
}

// 記事カードのプロパティ型定義
export interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  author: string;
  likes: number;
  phase: Phase;
  outcome: OutcomeType;
  categories: BusinessArea[];
  date: string;
  image_url?: string | null;
  event_date?: string | null;
  actual_event_date?: string | null;
} 