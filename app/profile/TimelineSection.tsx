'use client';

import type { Article } from '@/types';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface TimelineSectionProps {
  userId: string
  articles: Article[]
}

type FilterKey = 'all' | 'published' | 'draft'

export default function TimelineSection({ userId, articles }: TimelineSectionProps) {
  const [filter, setFilter] = useState<FilterKey>('all')

  const filtered = useMemo(() => {
    switch (filter) {
      case 'published':
        return articles.filter(a => (a as any).is_published === true)
      case 'draft':
        return articles.filter(a => (a as any).is_published === false)
      default:
        return articles
    }
  }, [articles, filter])

  const hasPostsForUser = filtered && filtered.length > 0

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">起業ストーリー タイムライン</h2>
        <div className="inline-flex rounded-full border border-gray-200 p-1 bg-gray-50">
          {([
            { key: 'all', label: '全て' },
            { key: 'published', label: '公開中' },
            { key: 'draft', label: '下書き' },
          ] as { key: FilterKey; label: string }[]).map(tab => {
            const active = filter === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full transition-colors whitespace-nowrap cursor-pointer ${active ? 'bg-white text-orange-600 border border-orange-200 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {!hasPostsForUser && (
        <div className="text-center py-12">
          <i className="ri-file-text-line text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-lg">投稿はまだありません</p>
          <p className="text-gray-400 text-sm mt-2">ユーザーID: {userId}</p>
        </div>
      )}

      {hasPostsForUser && (
        <div className="relative">
          <div className="space-y-8">
            {filtered.map((article) => {
              const eventDate = new Date(article.actual_event_date || article.event_date || article.date);
              const formattedDate = `${String(eventDate.getFullYear()).slice(2)}年${eventDate.getMonth() + 1}月${eventDate.getDate()}日`;
              
              return (
                <div key={article.id} className="relative">
                  {/* Row: date | line | card */}
                  <div className="grid grid-cols-1 md:grid-cols-[max-content_1px_1fr] md:gap-x-6">
                    {/* Date (hide on small screens) */}
                    <div className="hidden md:flex items-start justify-end pr-3">
                      <span className="text-sm font-medium text-gray-600">
                        {formattedDate}
                      </span>
                    </div>

                    {/* Center line and indicator (desktop) */}
                    <div className="hidden md:block relative self-stretch">
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-300"></div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>

                    {/* Article card */}
                    <div className="md:pl-0">
                      <Link href={`/articles/${article.id}`} className="block group">
                        <div className="relative bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                          {/* Top-right likes */}
                          <div className="absolute right-5 top-5 flex items-center text-gray-500">
                            <i className="ri-heart-line text-red-500 mr-1"></i>
                            <span className="text-sm font-medium">{article.likes}</span>
                          </div>

                          {/* Main content */}
                          <div className="pr-16">
                            {/* Date for small screens */}
                            <div className="md:hidden text-xs text-gray-500 mb-1">{formattedDate}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                              {article.title}
                            </h3>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {article.phase && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                                  {article.phase}
                                </span>
                              )}
                              {article.categories?.map((cat) => (
                                <span key={cat} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                  {cat}
                                </span>
                              ))}
                            </div>

                            {/* Summary */}
                            {article.summary && (
                              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                {article.summary}
                              </p>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                            {/* Left: Read article text-like link */}
                            <span className="inline-flex items-center text-sm font-medium text-orange-600 group-hover:text-orange-700 transition-colors">
                              記事を読む→
                            </span>

                            {/* Right: Edit and Share icons */}
                            <div className="flex items-center gap-3">
                              <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <i className="ri-edit-line text-lg"></i>
                              </button>
                              <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <i className="ri-share-line text-lg"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  )
}
