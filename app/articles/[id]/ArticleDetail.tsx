
'use client';

import Header from '@/components/Header';
import ArticleContent from './ArticleContent';
import AuthorProfile from './AuthorProfile';
import EngagementSection from './EngagementSection';
import RelatedArticles from './RelatedArticles';
import NavigationArticles from './NavigationArticles';
import { Article, ArticleWithProfile } from '@/types';

interface ArticleDetailProps {
  initialArticle: ArticleWithProfile;
  relatedArticles?: Article[];
  navigation?: {
    prevArticle: Article | null;
    nextArticle: Article | null;
    position: { index: number; total: number };
    daysFromEntrepreneurship: number;
  };
}

export default function ArticleDetail({ initialArticle, relatedArticles = [], navigation }: ArticleDetailProps) {
  const ap = initialArticle.authorProfile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <Header />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleContent article={initialArticle} />
        <AuthorProfile author={ap ? {
          id: ap.id,
          full_name: ap.full_name,
          username: ap.username,
          avatar_url: ap.avatar_url,
          career: ap.career ?? null,
          bio: ap.bio ?? null,
          consideration_start_date: ap.consideration_start_date ?? null,
          entrepreneurship_start_date: ap.entrepreneurship_start_date ?? null,
          age: ap.age ?? null,
        } : {
          id: initialArticle.author_id ?? '',
          full_name: initialArticle.author,
          username: null,
          avatar_url: null,
          career: null,
          bio: null,
          consideration_start_date: null,
          entrepreneurship_start_date: null,
          age: null,
        }} />
        <EngagementSection initialLikes={initialArticle.likes} />
        {navigation && (
          <NavigationArticles
            prevArticle={navigation.prevArticle}
            nextArticle={navigation.nextArticle}
            position={navigation.position}
            daysFromEntrepreneurship={navigation.daysFromEntrepreneurship}
          />
        )}
        <RelatedArticles relatedArticles={relatedArticles} />
      </article>
    </div>
  );
}
