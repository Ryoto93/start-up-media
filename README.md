# start-up-media

起業家向けメディアサイト - 大手企業出身者の起業体験談を時系列で共有するプラットフォーム

## 概要
大手企業勤務の若手社員が起業に踏み出すためのリアルな体験談共有サイトです。

## 技術スタック
- Next.js 14 + TypeScript
- Tailwind CSS
- Supabase（予定）
- Vercel
- Google Analytics 4

## 開発環境起動
```bash
npm install
npm run dev
```

## Google Analytics 4設定

Google Analytics 4の設定方法については、[GA_SETUP.md](./GA_SETUP.md)を参照してください。

### 環境変数設定
プロジェクトルートに `.env.local` ファイルを作成し、以下を設定してください：

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-S1L1C9CHTH
```