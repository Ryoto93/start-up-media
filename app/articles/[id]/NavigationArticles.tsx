
'use client';

import Link from 'next/link';
import type { Article } from '@/types';

interface NavigationArticlesProps {
  prevArticle: Article | null;
  nextArticle: Article | null;
  position: { index: number; total: number };
  daysFromEntrepreneurship: number;
}

export default function NavigationArticles({ prevArticle, nextArticle, position, daysFromEntrepreneurship }: NavigationArticlesProps) {

  const phaseColors: { [key: string]: string } = {
    '起業検討期': 'from-blue-500 to-blue-600',
    '直前・直後': 'from-green-500 to-green-600',
    '開始期': 'from-yellow-500 to-yellow-600',
    '成長期': 'from-purple-500 to-purple-600',
    '拡大期': 'from-red-500 to-red-600',
  };

  const outcomeIcons: { [key: string]: string } = {
    '成功体験': 'ri-trophy-line',
    '失敗体験': 'ri-error-warning-line',
    'その他': 'ri-bookmark-line',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">起業ジャーニーナビゲーション</h3>
        <p className="text-gray-600">同じ起業家の体験談を時系列で辿る</p>
      </div>

      <div className="relative">
        {/* 背景のグラデーションライン */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-200 via-orange-300 to-orange-400 rounded-full"></div>
        
        {/* 現在位置インジケーター */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white rounded-full p-4 border-4 border-orange-500 shadow-lg">
            <div className="bg-orange-500 rounded-full p-3">
              <i className="ri-map-pin-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
            </div>
          </div>
          <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {position.index + 1} / {position.total}
            </div>
            <div className="text-gray-600 text-sm mt-2" suppressHydrationWarning={true}>
              起業から{daysFromEntrepreneurship}日
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between min-h-[300px]">
          {/* 前の記事 */}
          <div className="flex-1 pr-8">
            {prevArticle ? (
              <Link href={`/articles/${prevArticle.id}`}>
                <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:border-orange-300 relative overflow-hidden">
                    {/* グラデーション背景 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${phaseColors[prevArticle.phase] || 'from-gray-400 to-gray-500'} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center text-orange-600 mb-3">
                        <i className="ri-arrow-left-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                        <span className="text-sm font-medium">前の記事</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${phaseColors[prevArticle.phase] || 'from-gray-400 to-gray-500'} text-white`}>
                          {prevArticle.phase}
                        </span>
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <i className={`${outcomeIcons[prevArticle.outcome] || 'ri-bookmark-line'} text-gray-600 text-sm`}></i>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {prevArticle.title}
                      </h4>
                      
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {prevArticle.summary}
                      </p>
                      
                      <div className="text-xs text-gray-500">
                        {prevArticle.event_date}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <i className="ri-flag-line text-3xl mb-2 w-8 h-8 flex items-center justify-center mx-auto"></i>
                  <p className="text-sm font-medium">起業ジャーニーの始まり</p>
                </div>
              </div>
            )}
          </div>

          {/* 次の記事 */}
          <div className="flex-1 pl-8">
            {nextArticle ? (
              <Link href={`/articles/${nextArticle.id}`}>
                <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="bg-gradient-to-bl from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:border-orange-300 relative overflow-hidden">
                    {/* グラデーション背景 */}
                    <div className={`absolute inset-0 bg-gradient-to-bl ${phaseColors[nextArticle.phase] || 'from-gray-400 to-gray-500'} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-end text-orange-600 mb-3">
                        <span className="text-sm font-medium">次の記事</span>
                        <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center"></i>
                      </div>
                      
                      <div className="flex items-center justify-end gap-2 mb-3">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <i className={`${outcomeIcons[nextArticle.outcome] || 'ri-bookmark-line'} text-gray-600 text-sm`}></i>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${phaseColors[nextArticle.phase] || 'from-gray-400 to-gray-500'} text-white`}>
                          {nextArticle.phase}
                        </span>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-right group-hover:text-orange-600 transition-colors">
                        {nextArticle.title}
                      </h4>
                      
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3 text-right">
                        {nextArticle.summary}
                      </p>
                      
                      <div className="text-xs text-gray-500 text-right">
                        {nextArticle.event_date}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <i className="ri-rocket-line text-3xl mb-2 w-8 h-8 flex items-center justify-center mx-auto"></i>
                  <p className="text-sm font-medium">現在進行中</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
