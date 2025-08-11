# Google Analytics 4 設定ガイド

## 環境変数設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を追加してください：

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-S1L1C9CHTH

# 環境設定
NODE_ENV=development
```

## 実装内容

### 1. Google Analytics設定ファイル (`lib/gtag.ts`)
- GA4の初期化と設定
- ページビュー追跡
- カスタムイベント追跡
- 起業メディアサイト向けの専用イベント関数

### 2. Google Analyticsコンポーネント (`components/GoogleAnalytics.tsx`)
- GA4スクリプトの読み込み
- 開発環境では無効化
- プライバシー準拠設定

### 3. ページ追跡フック (`hooks/usePageTracking.ts`)
- Next.js 14 App Router対応
- ページ遷移の自動追跡
- クエリパラメータも含めた追跡

### 4. ページ追跡プロバイダー (`components/PageTrackingProvider.tsx`)
- ページ追跡フックの提供
- レイアウトでの統合

### 5. カスタムイベント追跡
- `article_post`: 記事投稿
- `article_like`: いいね
- `user_registration`: ユーザー登録
- `filter_use`: フィルター使用

## 使用方法

### 基本的なページビュー追跡
自動的に全てのページ遷移が追跡されます。

### カスタムイベントの追跡
```typescript
import { trackArticleLike, trackFilterUse } from '@/lib/gtag';

// いいねイベント
trackArticleLike('article-123', '起業体験談');

// フィルター使用イベント
trackFilterUse('phase', '起業検討期');
```

## プライバシー対応

- IPアドレスの匿名化
- セキュアなクッキー設定
- 開発環境での無効化
- 環境変数での設定管理

## 注意事項

- 本番環境でのみ有効化されます
- 環境変数 `NEXT_PUBLIC_GA_MEASUREMENT_ID` が設定されていることを確認してください
- プライバシーポリシーでの追跡についての記載が必要です 