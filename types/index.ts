// 記事関連の型定義
export interface Article {
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
  imageUrl: string;
  eventDate: string;
  authorProfile: AuthorProfile;
  isPublished?: boolean | null;
}

// 著者プロフィールの型定義
export interface AuthorProfile {
  name: string;
  age: number;
  career: string;
  bio: string;
  avatar: string;
  entrepreneurshipStartDate: string;
  entrepreneurshipConsiderationStartDate: string;
}

// フィルター状態の型定義
export interface FilterState {
  phase: string;
  outcome: string;
  categories: string[];
  searchKeyword: string;
  sortBy: string;
}

// 記事カードのプロパティ型定義
export interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  author: string;
  likes: number;
  phase: string;
  outcome: string;
  categories: string[];
  date: string;
  imageUrl: string;
  eventDate: string;
}

// フェーズの型定義
export type Phase = '起業検討期' | '直前・直後' | '開始期' | '成長期';

// 成果の型定義
export type OutcomeType = '成功体験' | '失敗体験' | 'その他';

// ビジネス領域の型定義
export type BusinessArea = '営業' | 'マーケティング' | '事業計画' | '経理' | '開発' | '雑務'; 