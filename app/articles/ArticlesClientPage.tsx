'use client';

import ArticleCard from '@/components/ArticleCard';
import FilterSection from '@/components/FilterSection';
import { FilterState, Article } from '@/types';
import { useState } from 'react';

interface ArticlesClientPageProps {
  initialArticles: Article[];
}

export default function ArticlesClientPage({ initialArticles }: ArticlesClientPageProps) {
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = initialArticles;

    if (filters.phase) {
      filtered = filtered.filter(article => article.phase === filters.phase);
    }

    if (filters.outcome) {
      filtered = filtered.filter(article => article.outcome === filters.outcome);
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter(article => 
        filters.categories.some((category: string) => article.categories.includes(category))
      );
    }

    if (filters.searchKeyword) {
      const keyword = filters.searchKeyword.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(keyword) ||
        article.summary.toLowerCase().includes(keyword) ||
        article.author.toLowerCase().includes(keyword)
      );
    }

    switch (filters.sortBy) {
      case 'popular':
        filtered = [...filtered].sort((a, b) => b.likes - a.likes);
        break;
      case 'date':
        filtered = [...filtered].sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
        break;
      case 'newest':
      default:
        filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    setFilteredArticles(filtered);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
      <div className="lg:col-span-1 order-2 lg:order-1">
        <FilterSection onFilterChange={handleFilterChange} />
      </div>
      
      <div className="lg:col-span-3 order-1 lg:order-2">
        <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-bold text-2xl text-orange-600">{filteredArticles.length}</span> 
              <span className="ml-2">件の記事が見つかりました</span>
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="ri-article-line w-4 h-4 flex items-center justify-center"></i>
              <span>起業体験談</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard 
              key={article.id} 
              id={article.id}
              title={article.title}
              summary={article.summary}
              author={article.author}
              likes={article.likes}
              phase={article.phase}
              outcome={article.outcome}
              categories={article.categories}
              date={article.date}
              imageUrl={article.imageUrl}
              eventDate={article.eventDate}
            />
          ))}
        </div>
        
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-search-line text-gray-400 text-3xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">記事が見つかりませんでした</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">検索条件を変更してもう一度お試しください</p>
            <button 
              onClick={() => window.location.reload()} 
              className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors cursor-pointer font-medium"
            >
              <i className="ri-refresh-line w-4 h-4 flex items-center justify-center"></i>
              <span>リセット</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 