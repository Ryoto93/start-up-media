'use client';

import { useState } from 'react';

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  phase: string;
  category: string[];
  summary: string;
  likes: number;
  isPublished: boolean;
}

export default function TimelineSection() {
  const [filter, setFilter] = useState('all');

  const timelineData: TimelineItem[] = [
    {
      id: '1',
      title: 'Googleを退職する決断をした日',
      date: '2022-01-15',
      phase: '起業検討期',
      category: ['事業計画'],
      summary: '5年間勤めたGoogleを退職し、起業への第一歩を踏み出すまでの心境や判断基準について',
      likes: 45,
      isPublished: true
    },
    {
      id: '2',
      title: '共同創業者との出会いと最初の議論',
      date: '2022-02-28',
      phase: '起業直前・直後',
      category: ['事業計画', '雑務'],
      summary: '技術系の共同創業者と出会い、事業アイデアを練り上げていく過程での学び',
      likes: 32,
      isPublished: true
    },
    {
      id: '3',
      title: '会社設立と初期の資金調達活動',
      date: '2022-04-10',
      phase: '起業直前・直後',
      category: ['経理', '事業計画'],
      summary: '法人設立の手続きから、エンジェル投資家への初回ピッチまでの実践的なノウハウ',
      likes: 67,
      isPublished: true
    },
    {
      id: '4',
      title: '初のプロダクトローンチで学んだ失敗',
      date: '2022-07-20',
      phase: '開始期',
      category: ['マーケ', '開発'],
      summary: 'MVPをリリースしたものの、ユーザーからの反応が予想と全く違った経験談',
      likes: 89,
      isPublished: true
    },
    {
      id: '5',
      title: 'ピボット決断とチーム再編成',
      date: '2022-10-05',
      phase: '開始期',
      category: ['事業計画', '雑務'],
      summary: '当初のプロダクトから大幅な方向転換を決断し、チーム体制を見直した経験',
      likes: 56,
      isPublished: true
    },
    {
      id: '6',
      title: 'シリーズAラウンドの資金調達成功',
      date: '2023-03-15',
      phase: '成長期',
      category: ['経理', '事業計画'],
      summary: 'VCからの本格的な資金調達に成功するまでの長い道のりと準備のポイント',
      likes: 123,
      isPublished: true
    },
    {
      id: '7',
      title: '営業組織の立ち上げと初期成果',
      date: '2023-06-30',
      phase: '成長期',
      category: ['営業', '雑務'],
      summary: '技術者中心のチームに営業機能を追加し、売上を伸ばしていく過程での試行錯誤',
      likes: 78,
      isPublished: true
    },
    {
      id: '8',
      title: '組織拡大に伴うマネジメントの課題',
      date: '2023-11-20',
      phase: '成長期',
      category: ['雑務'],
      summary: '従業員数が20名を超えて直面した組織運営の課題と解決策について',
      likes: 34,
      isPublished: false
    }
  ];

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case '起業検討期': return 'bg-blue-100 text-blue-800';
      case '起業直前・直後': return 'bg-green-100 text-green-800';
      case '開始期': return 'bg-yellow-100 text-yellow-800';
      case '成長期': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      '営業': 'bg-red-50 text-red-700',
      'マーケ': 'bg-pink-50 text-pink-700',
      '事業計画': 'bg-indigo-50 text-indigo-700',
      '経理': 'bg-green-50 text-green-700',
      '開発': 'bg-blue-50 text-blue-700',
      '雑務': 'bg-gray-50 text-gray-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700';
  };

  const filteredData = timelineData.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'published') return item.isPublished;
    if (filter === 'draft') return !item.isPublished;
    return true;
  });

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">起業ストーリー タイムライン</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            全て ({timelineData.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'published'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            公開中 ({timelineData.filter(item => item.isPublished).length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'draft'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            下書き ({timelineData.filter(item => !item.isPublished).length})
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-6 sm:space-y-8">
          {filteredData.map((item, index) => (
            <div key={item.id} className="relative flex gap-4 sm:gap-6">
              <div className="flex-shrink-0 relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white border-4 border-orange-200 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-orange-500 rounded-full"></div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-50 px-2 py-1 rounded text-xs text-gray-600 whitespace-nowrap">
                  {new Date(item.date).toLocaleDateString('ja-JP', { 
                    year: '2-digit', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>

              <div className="flex-1 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-sm transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 hover:text-orange-600 cursor-pointer leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getPhaseColor(item.phase)}`}>
                        {item.phase}
                      </span>
                      {item.category.map((cat, idx) => (
                        <span key={idx} className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(cat)}`}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {!item.isPublished && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        下書き
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-gray-500">
                      <i className="ri-heart-line text-sm"></i>
                      <span className="text-sm">{item.likes}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">{item.summary}</p>

                <div className="flex items-center justify-between">
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm cursor-pointer">
                    記事を読む →
                  </button>
                  <div className="flex gap-1 sm:gap-2">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                      <i className="ri-edit-line text-sm"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                      <i className="ri-share-line text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-file-text-line text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-lg">該当する記事がありません</p>
        </div>
      )}
    </div>
  );
}
