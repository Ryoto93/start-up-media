# 起業家向けメディアサイト開発ルール

## プロジェクト概要
- 大手企業出身者の起業体験談を共有するメディアサイト
- ユーザーが起業ストーリーを時系列で投稿・閲覧可能
- 詳細なフィルタリングで関連記事を効率的に検索
- Google認証のみでの簡単ログイン

## 技術スタック
- Next.js 14 + TypeScript（App Router必須）
- Tailwind CSS
- Supabase（データベース・認証・ストレージ）
- Google Analytics 4
- Vercel（ホスティング）

## 重要な要件
### 認証システム
- **Google認証のみ使用**（メール・パスワード認証は禁止）
- Supabase Auth with Google OAuth
- 初回登録時は追加プロフィール情報入力

### データ構造の特殊要件
- 記事には「投稿日」と「実際の出来事日付」の2つの日付が存在
- プロフィールページでは「実際の出来事日付」順で時系列表示
- カテゴリは3軸：フェーズ・成果軸・領域

## コーディング規則

### Next.js
- **App Router必須**（pages routerは使用禁止）
- Server ComponentsとClient Componentsを適切に分離
- 'use client'は最小限に抑制
- ファイル名：kebab-case（例：article-list.tsx）
- フォルダ名：kebab-case（例：article-detail/）

### TypeScript
- 厳密な型定義必須
- any型使用禁止
- インターフェース名にI接頭辞不要
- 型定義は types/ ディレクトリに集約

```typescript
// 良い例
interface Article {
  id: string;
  title: string;
  content: string;
  published_at: string;      // 投稿日
  actual_event_date: string; // 実際の出来事日付
  phase: Phase;
  outcome_type: OutcomeType;
  business_areas: BusinessArea[];
}

// 悪い例
interface IArticle {
  data: any; // any型禁止
}
```

### Tailwind CSS
- ユーティリティクラス最優先
- カスタムCSS最小限
- mobile-first設計
- カラーパレット：white, black, gray階調 + オレンジアクセント

```typescript
// 良い例
<button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
  ログイン
</button>

// 悪い例
<button style={{backgroundColor: '#ff6600'}}>
  ログイン
</button>
```

### ディレクトリ構造
```
src/
├── app/                 # App Router pages
│   ├── page.tsx        # トップページ
│   ├── articles/       # 記事一覧・詳細
│   ├── profile/        # プロフィール
│   └── auth/           # 認証関連
├── components/         # 再利用可能なコンポーネント
│   ├── ui/            # 基本UIコンポーネント
│   ├── articles/      # 記事関連コンポーネント
│   └── auth/          # 認証関連コンポーネント
├── lib/               # ユーティリティ・設定
│   ├── supabase.ts    # Supabase設定
│   ├── utils.ts       # 共通ユーティリティ
│   └── validations.ts # バリデーション
├── types/             # TypeScript型定義
├── hooks/             # カスタムフック
└── constants/         # 定数定義
```

### Supabase連携
- クライアント設定は lib/supabase.ts で一元管理
- Server ComponentsではcreateServerComponentClient使用
- Client ComponentsではcreateClientComponentClient使用
- エラーハンドリング必須

```typescript
// Server Component例
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function ArticlesPage() {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('actual_event_date', { ascending: false });
    
    if (error) throw error;
    
    return <ArticleList articles={articles} />;
  } catch (error) {
    return <ErrorMessage message="記事の取得に失敗しました" />;
  }
}
```

### 認証実装
- Google認証のみ
- 認証状態はContext APIで管理
- 保護されたページには認証チェック実装

```typescript
// 認証コンテキスト例
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

## デザイン要件

### UIコンセプト
- ポップさありつつシンプル
- 誠実で信頼感のあるデザイン
- Z世代向けの親しみやすさ
- オレンジアクセントで起業への情熱表現

### レスポンシブ設計
- Mobile-first必須
- ブレークポイント：sm(640px), md(768px), lg(1024px), xl(1280px)
- タッチフレンドリーなUI（最小44px四方）

### アニメーション
- hover effects必須
- transition-all duration-200 ease-in-out
- ページ遷移はスムーズに

## 特別な機能要件

### フィルタリング機能
- 3軸同時フィルタリング対応
- URLクエリパラメータでフィルター状態保持
- リアルタイム結果更新

```typescript
// フィルター型定義例
interface ArticleFilters {
  phase?: Phase;
  outcome_type?: OutcomeType;
  business_areas?: BusinessArea[];
  search_query?: string;
}
```

### 時系列表示（重要）
- プロフィールページでは actual_event_date 順で表示
- タイムライン風のUI実装
- 投稿日ではなく実際の出来事日付順

### Google Analytics
- GA4実装必須
- カスタムイベント追跡
- プライバシー準拠

## パフォーマンス要件
- Core Web Vitals最適化
- 画像はnext/image使用
- 動的インポートでコード分割
- キャッシュ戦略実装

## セキュリティ要件
- 環境変数で機密情報管理
- XSS対策（入力値サニタイズ）
- Supabase Row Level Security有効化
- HTTPS必須

## 禁止事項
- pages routerの使用
- any型の使用
- console.logの本番環境残存
- インラインstyleの使用
- メール・パスワード認証の実装
- ハードコーディングされた値

## エラーハンドリング
- 全てのAPI呼び出しにtry-catch
- ユーザーフレンドリーなエラーメッセージ
- エラーバウンダリー実装
- ローディング状態の表示

## コンポーネント設計原則
- 単一責任の原則
- props型定義必須
- children propsの適切な使用
- forwardRef必要時のみ使用

```typescript
// コンポーネント例
interface ArticleCardProps {
  article: Article;
  onLike?: (articleId: string) => void;
  className?: string;
}

export function ArticleCard({ article, onLike, className }: ArticleCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
      <p className="text-gray-600 mt-2">{article.content.substring(0, 150)}...</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          {new Date(article.actual_event_date).toLocaleDateString('ja-JP')}
        </span>
        {onLike && (
          <button
            onClick={() => onLike(article.id)}
            className="text-orange-500 hover:text-orange-600 transition-colors"
          >
            ♡ {article.likes_count}
          </button>
        )}
      </div>
    </div>
  );
}
```

このルールに従って一貫性のある高品質なコードを生成してください。