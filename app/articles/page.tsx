
import Header from '@/components/Header';
import ArticlesClientPage from './ArticlesClientPage';
import { getAllPublishedArticles } from '@/lib/data/articles';

export default async function ArticlesPage() {
  // Server Componentでデータを取得
  const initialArticles = await getAllPublishedArticles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <Header />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">記事一覧</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">大手企業出身者による起業体験談を探す</p>
        </div>

        <ArticlesClientPage initialArticles={initialArticles} />
      </div>
    </div>
  );
}
export const revalidate = 0;