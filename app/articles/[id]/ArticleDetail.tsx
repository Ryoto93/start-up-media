
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
}

export default function ArticleDetail({ initialArticle }: ArticleDetailProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <Header />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleContent article={initialArticle} />
        <AuthorProfile author={initialArticle.authorProfile} />
        <EngagementSection articleId={initialArticle.id} initialLikes={initialArticle.likes} />
        <NavigationArticles currentAuthor={initialArticle.author} currentId={initialArticle.id} />
        <RelatedArticles currentArticle={initialArticle} />
      </article>
    </div>
  );
}
