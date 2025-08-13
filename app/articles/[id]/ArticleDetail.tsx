
'use client';

import Header from '@/components/Header';
import ArticleContent from './ArticleContent';
import AuthorProfile from './AuthorProfile';
import EngagementSection from './EngagementSection';
import RelatedArticles from './RelatedArticles';
import NavigationArticles from './NavigationArticles';
import { Article } from '@/types';

interface ArticleDetailProps {
  initialArticle: Article;
  relatedArticles?: Article[];
  navigation?: {
    prevArticle: Article | null;
    nextArticle: Article | null;
    position: { index: number; total: number };
    daysFromEntrepreneurship: number;
  };
}

export default function ArticleDetail({ initialArticle, relatedArticles = [], navigation }: ArticleDetailProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <Header />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleContent article={initialArticle} />
        <AuthorProfile author={initialArticle.authorProfile} />
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
