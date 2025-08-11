
import { notFound } from 'next/navigation';
import ArticleDetail from './ArticleDetail';
import { getArticleById, getAllArticleIds } from '@/lib/data/articles';

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

  return <ArticleDetail initialArticle={article} />;
}
