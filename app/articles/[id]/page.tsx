
import { notFound } from 'next/navigation';
import ArticleDetail from './ArticleDetail';
import { getArticleById } from '@/lib/data/articles';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
    { id: '11' },
    { id: '12' },
  ];
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  // Server Componentでデータを取得
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return <ArticleDetail initialArticle={article} />;
}
