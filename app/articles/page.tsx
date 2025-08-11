
'use client';

import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';
import FilterSection from '@/components/FilterSection';
import { FilterState } from '@/types';
import { useState } from 'react';

export default function ArticlesPage() {
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = allArticles;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <Header />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">記事一覧</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">大手企業出身者による起業体験談を探す</p>
        </div>

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
                <ArticleCard key={article.id} {...article} />
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
      </div>
    </div>
  );
}

const allArticles = [
  {
    id: '1',
    title: '大手メーカーから食品スタートアップへ：失敗から学んだマーケティング戦略',
    summary: 'トヨタでの15年間の経験を活かし、地域密着型の食品事業を立ち上げました。しかし、最初の商品は大失敗。その経験から学んだ真のマーケティングとは？',
    author: '田中 健太',
    likes: 234,
    phase: '成長期',
    outcome: '失敗体験',
    categories: ['マーケティング', '事業計画'],
    date: '2024-01-15',
    eventDate: '2023-08-15'
  },
  {
    id: '2',
    title: 'IT企業役員からヘルスケア起業：規制業界で学んだ事業開発の極意',
    summary: 'NTTデータで培った技術力を医療分野に応用。規制が厳しい業界での事業開発で直面した課題と、それを乗り越えるために必要だった視点の転換について。',
    author: '佐藤 美咲',
    likes: 189,
    phase: '開始期',
    outcome: '成功体験',
    categories: ['事業計画', '経理'],
    date: '2024-01-12',
    eventDate: '2023-09-20'
  },
  {
    id: '3',
    title: '銀行員からフィンテック創業：金融業界の常識を覆す挑戦',
    summary: '三菱UFJ銀行での10年間で感じた金融業界の課題を解決するべく、個人向け資産管理アプリを開発。既存金融機関との競合で学んだ差別化戦略。',
    author: '山田 雄介',
    likes: 156,
    phase: '直前・直後',
    outcome: 'その他',
    categories: ['開発', '営業'],
    date: '2024-01-10',
    eventDate: '2023-11-10'
  },
  {
    id: '4',
    title: 'コンサル出身者が語る：戦略立案スキルを活かした教育事業の立ち上げ',
    summary: 'マッキンゼーでの戦略コンサルティング経験を活かし、オンライン教育プラットフォームを創業。論理的思考だけでは解決できなかった現場の課題とは？',
    author: '鈴木 翔太',
    likes: 198,
    phase: '起業検討期',
    outcome: '成功体験',
    categories: ['事業計画', 'マーケティング'],
    date: '2024-01-08',
    eventDate: '2023-07-25'
  },
  {
    id: '5',
    title: '商社マンから農業テック：地方創生を目指す新規事業への挑戦',
    summary: '伊藤忠商事での海外事業経験を活かし、スマート農業システムを開発。都市部と地方の格差を埋める技術で、持続可能な農業の実現を目指しています。',
    author: '松本 裕子',
    likes: 87,
    phase: '成長期',
    outcome: '成功体験',
    categories: ['開発', '事業計画'],
    date: '2024-01-20',
    eventDate: '2023-06-12'
  },
  {
    id: '6',
    title: '大手保険会社からインシュアテック：顧客体験を革新する新サービス',
    summary: '東京海上での20年の経験で感じた保険業界の課題。AIを活用した保険査定システムで、お客様の待ち時間を90%削減することに成功しました。',
    author: '高橋 慎一',
    likes: 143,
    phase: '開始期',
    outcome: '成功体験',
    categories: ['開発', '営業'],
    date: '2024-01-18',
    eventDate: '2023-10-05'
  },
  {
    id: '7',
    title: '製薬会社研究員からバイオベンチャー：新薬開発への情熱を形に',
    summary: '武田薬品での研究開発経験を基に、希少疾患向けの新薬開発に特化したバイオベンチャーを設立。資金調達の難しさと研究への想いについて語ります。',
    author: '小林 真理',
    likes: 92,
    phase: '直前・直後',
    outcome: 'その他',
    categories: ['事業計画', '経理'],
    date: '2024-01-16',
    eventDate: '2023-09-30'
  },
  {
    id: '8',
    title: '大手小売りからEコマース：オムニチャネル戦略で差別化を図る',
    summary: 'イオングループでの店舗運営経験を活かし、リアル店舗とデジタルを融合したEコマースプラットフォームを開発。従来の小売業との違いとは？',
    author: '森田 大輔',
    likes: 76,
    phase: '起業検討期',
    outcome: '失敗体験',
    categories: ['マーケティング', '営業'],
    date: '2024-01-14',
    eventDate: '2023-12-01'
  },
  {
    id: '9',
    title: '外資系投資銀行からSaaS起業：B2B営業で学んだ顧客の本質',
    summary: 'ゴールドマン・サックスでの経験を活かし、中小企業向けの業務効率化SaaSを開発。投資銀行で培った営業スキルが、どのように起業に活かされたのか。',
    author: '渡辺 亮太',
    likes: 312,
    phase: '成長期',
    outcome: '成功体験',
    categories: ['営業', 'マーケティング'],
    date: '2024-01-05',
    eventDate: '2023-05-18'
  },
  {
    id: '10',
    title: '総合商社から再生可能エネルギー：ESG投資の波に乗る新事業',
    summary: '三井物産でのエネルギー事業経験を基に、太陽光発電システムの開発・販売事業を立ち上げ。ESG投資が注目される中での事業戦略について詳しく解説。',
    author: '中村 優花',
    likes: 287,
    phase: '開始期',
    outcome: '成功体験',
    categories: ['事業計画', '経理'],
    date: '2024-01-03',
    eventDate: '2023-08-22'
  },
  {
    id: '11',
    title: 'メガバンクからフィナンシャルプランニング：個人の資産形成をサポート',
    summary: 'みずほ銀行での個人営業経験を活かし、AIを活用したパーソナライズド投資アドバイスサービスを開発。従来の金融サービスとの差別化ポイント。',
    author: '加藤 直樹',
    likes: 265,
    phase: '成長期',
    outcome: 'その他',
    categories: ['開発', '営業'],
    date: '2024-01-01',
    eventDate: '2023-04-10'
  },
  {
    id: '12',
    title: '大手広告代理店からマーケティングテック：データドリブンな広告運用',
    summary: '電通でのデジタルマーケティング経験を基に、AI駆動型の広告運用プラットフォームを開発。従来の広告業界では実現できなかった精度の高いターゲティング。',
    author: '井上 沙織',
    likes: 243,
    phase: '直前・直後',
    outcome: '失敗体験',
    categories: ['マーケティング', '開発'],
    date: '2023-12-28',
    eventDate: '2023-11-15'
  }
];