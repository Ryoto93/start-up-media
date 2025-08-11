// Google Analytics 4 設定とユーティリティ
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-S1L1C9CHTH';

// GA4の初期化
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// ページビュー追跡
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// カスタムイベント追跡
export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 起業メディアサイト向けカスタムイベント
export const trackArticlePost = (articleId: string, title: string) => {
  event('article_post', 'engagement', title, 1);
};

export const trackArticleLike = (articleId: string, title: string) => {
  event('article_like', 'engagement', title, 1);
};

export const trackUserRegistration = (userId: string) => {
  event('user_registration', 'user', userId, 1);
};

export const trackFilterUse = (filterType: string, filterValue: string) => {
  event('filter_use', 'engagement', `${filterType}: ${filterValue}`, 1);
};

// 型定義
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
} 