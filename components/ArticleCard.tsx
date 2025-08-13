
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { trackArticleLike } from '@/lib/gtag';

import { ArticleCardProps } from '@/types';

export default function ArticleCard({ id, title, summary, author, likes, phase, outcome, categories, date }: ArticleCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    
    // Google Analytics でいいねイベントを追跡
    if (!isLiked) {
      trackArticleLike(id, title);
    }
  };

  const phaseColors: { [key: string]: string } = {
    '起業検討期': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
    '直前・直後': 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    '開始期': 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white',
    '成長期': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
  };

  const outcomeColors: { [key: string]: string } = {
    '成功体験': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    '失敗体験': 'bg-red-50 text-red-700 border border-red-200',
    'その他': 'bg-gray-50 text-gray-700 border border-gray-200',
  };

  const outcomeIcons: { [key: string]: string } = {
    '成功体験': 'ri-trophy-line',
    '失敗体験': 'ri-error-warning-line',
    'その他': 'ri-bookmark-line',
  };

  return (
    <Link href={`/articles/${id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
        {/* ヘッダー部分 - グラデーション背景 */}
        <div className="bg-gradient-to-r from-orange-50 via-orange-100 to-amber-50 p-6 border-b border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${phaseColors[phase] || 'bg-gray-100 text-gray-800'}`}>
              {phase}
            </span>
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 shadow-sm ${
                isLiked 
                  ? 'bg-red-500 text-white shadow-red-200' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <i className={`w-4 h-4 flex items-center justify-center ${isLiked ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
              <span className="text-sm font-medium">{likeCount}</span>
            </button>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight">
            {title}
          </h3>
          
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${outcomeColors[outcome] || 'bg-gray-100 text-gray-800'}`}>
              <i className={`${outcomeIcons[outcome]} w-4 h-4 flex items-center justify-center mr-1`}></i>
              {outcome}
            </span>
          </div>
        </div>

        {/* コンテンツ部分 */}
        <div className="p-6">
          <p className="text-gray-600 text-base mb-6 line-clamp-3 leading-relaxed">
            {summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category, index) => (
              <span key={index} className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-lg border border-orange-100 font-medium">
                {category}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                {author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{author}</div>
                <div className="text-sm text-gray-500">起業家</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {(() => {
                  const d = new Date(date);
                  const isValid = !isNaN(d.getTime());
                  if (!isValid) return '';
                  const y = d.getFullYear();
                  const m = String(d.getMonth() + 1).padStart(2, '0');
                  const da = String(d.getDate()).padStart(2, '0');
                  return `${y}/${m}/${da}`;
                })()}
              </div>
              <div className="text-xs text-gray-500">投稿日</div>
            </div>
          </div>
        </div>

        {/* ホバー時のアクセント */}
        <div className="h-1 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
}