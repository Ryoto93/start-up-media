
import Header from '../../components/Header';
import CreateArticleForm from './CreateArticleForm';
import { createArticleWithState } from '@/lib/data/articles-actions';

export default function CreateArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">新しい記事を投稿</h1>
          <p className="text-gray-600 text-sm sm:text-base">あなたの起業ジャーニーを仲間と共有しましょう</p>
        </div>
        <CreateArticleForm serverAction={createArticleWithState} />
      </main>
    </div>
  );
}
