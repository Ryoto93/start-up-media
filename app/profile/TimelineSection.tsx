'use client';

import type { Article } from '@/types';

interface TimelineSectionProps {
  userId: string
  articles: Article[]
}

export default function TimelineSection({ userId, articles }: TimelineSectionProps) {
  const hasPostsForUser = articles && articles.length > 0

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">起業ストーリー タイムライン</h2>

      {!hasPostsForUser && (
        <div className="text-center py-12">
          <i className="ri-file-text-line text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-lg">投稿はまだありません</p>
          <p className="text-gray-400 text-sm mt-2">ユーザーID: {userId}</p>
        </div>
      )}

      {hasPostsForUser && (
        <ol className="relative border-l border-gray-200 ml-3 sm:ml-6">
          {articles.map((article) => (
            <li key={article.id} className="mb-8 ml-4">
              <div className="absolute -left-1.5 mt-1.5 w-3 h-3 bg-orange-400 rounded-full border border-white"></div>
              <time className="mb-1 text-xs sm:text-sm font-normal leading-none text-gray-400">
                {new Date(article.eventDate || article.date).toLocaleDateString('ja-JP')}
              </time>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-1">{article.title}</h3>
              {article.summary && (
                <p className="mb-2 text-sm text-gray-600 whitespace-pre-wrap">{article.summary}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center"><i className="ri-user-line mr-1"></i>{article.author}</span>
                <span className="inline-flex items-center"><i className="ri-thumb-up-line mr-1"></i>{article.likes}</span>
                <span className="inline-flex items-center"><i className="ri-rocket-line mr-1"></i>{article.phase}</span>
                <span className="inline-flex items-center"><i className="ri-flag-line mr-1"></i>{article.outcome}</span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
