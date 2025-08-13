
'use client';

import { useState } from 'react';

import { Article } from '@/types';

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-orange-200">{line.replace('# ', '')}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl sm:text-2xl font-semibold text-gray-900 mt-6 mb-3">{line.replace('## ', '')}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg sm:text-xl font-semibold text-gray-900 mt-5 mb-2">{line.replace('### ', '')}</h3>;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold text-gray-900 mt-4 mb-2 bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">{line.replace(/\*\*/g, '')}</p>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="text-gray-700 ml-4 mb-2 text-sm sm:text-base pl-2">{line.replace('- ', '')}</li>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">{line}</p>;
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
      {/* ヘッダー部分 - 美しいグラデーション背景 */}
      <div className="bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 p-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${phaseColors[article.phase] || 'bg-gray-100 text-gray-800'}`}>
            {article.phase}
          </span>
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${outcomeColors[article.outcome] || 'bg-gray-100 text-gray-800'}`}>
            <i className={`${outcomeIcons[article.outcome]} w-4 h-4 flex items-center justify-center mr-2`}></i>
            {article.outcome}
          </span>
          {article.categories.map((category, index) => (
            <span key={index} className="px-3 py-1 bg-white/70 text-orange-700 text-sm rounded-lg border border-orange-200 font-medium backdrop-blur-sm">
              {category}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-6">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 space-y-2 sm:space-y-0 sm:space-x-6 bg-white/50 p-4 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
                <span>投稿日：{article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
                <span>出来事日：{article.actual_event_date || article.event_date || article.date}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 shadow-sm self-start ${
              isBookmarked 
                ? 'bg-orange-500 text-white shadow-orange-200' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <i className={`w-5 h-5 flex items-center justify-center ${isBookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'}`}></i>
            <span className="font-medium whitespace-nowrap">
              {isBookmarked ? 'ブックマーク済み' : 'ブックマーク'}
            </span>
          </button>
        </div>
      </div>

      {/* コンテンツ部分 */}
      <div className="p-8">
        <div className="prose prose-lg max-w-none">
          {formatContent(article.content)}
        </div>

        {/* フッター部分 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-8 mt-8 border-t border-gray-200 gap-4 bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-5 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 cursor-pointer shadow-sm">
              <i className="ri-share-line w-4 h-4 flex items-center justify-center"></i>
              <span className="font-medium whitespace-nowrap">シェア</span>
            </button>
            <button className="flex items-center space-x-2 px-5 py-3 bg-white text-gray-600 rounded-full hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-200 shadow-sm">
              <i className="ri-flag-line w-4 h-4 flex items-center justify-center"></i>
              <span className="font-medium whitespace-nowrap">報告</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200">
            <i className="ri-refresh-line w-4 h-4 flex items-center justify-center mr-2 inline-flex"></i>
            最終更新：{article.date}
          </div>
        </div>
      </div>
    </div>
  );
}