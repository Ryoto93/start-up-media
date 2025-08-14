
import { notFound } from 'next/navigation';
import ArticleDetail from './ArticleDetail';
import { getArticleById, getAllArticleIds, getRelatedArticlesById, getPrevNextForAuthor } from '@/lib/data/articles';
import { ArticleWithProfile } from '@/types';

export async function generateStaticParams() {
  const articles = await getAllArticleIds();
  return articles.map(article => ({ id: article.id }));
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  // Server Componentでデータを取得
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  // Related articles
  const relatedArticles = await getRelatedArticlesById(article.id);

  // Prev/Next for author timeline
  let prevArticle = null;
  let nextArticle = null;
  let position = { index: 0, total: 1 };
  let daysFromEntrepreneurship = 0;
  if (article.author_id) {
    const { prev, next, index, total, firstEventDate } = await getPrevNextForAuthor(article.author_id, article.id);
    prevArticle = prev;
    nextArticle = next;
    position = { index, total };
    if (firstEventDate) {
      const start = new Date(firstEventDate);
      const now = new Date();
      const diff = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      daysFromEntrepreneurship = Math.max(0, diff);
    }
  }

  return <ArticleDetail initialArticle={article as ArticleWithProfile} relatedArticles={relatedArticles} navigation={{ prevArticle, nextArticle, position, daysFromEntrepreneurship }} />;
}
