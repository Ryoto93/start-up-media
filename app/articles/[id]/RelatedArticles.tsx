
'use client';

import Link from 'next/link';

interface RelatedArticlesProps {
  currentArticle: {
    id: string;
    phase: string;
    categories: string[];
    outcome: string;
  };
}

export default function RelatedArticles({ currentArticle }: RelatedArticlesProps) {
  const relatedArticles = allRelatedArticles.filter(article => {
    if (article.id === currentArticle.id) return false;
    
    const phaseMatch = article.phase === currentArticle.phase;
    const categoryMatch = article.categories.some(cat => currentArticle.categories.includes(cat));
    const outcomeMatch = article.outcome === currentArticle.outcome;
    
    return phaseMatch || categoryMatch || outcomeMatch;
  }).slice(0, 3);

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

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">関連記事</h3>
        <p className="text-gray-600">似た体験を持つ起業家の記事</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`} className="group">
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-1">
              {/* ヘッダー部分 */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 border-b border-orange-100">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${phaseColors[article.phase] || 'bg-gray-100 text-gray-800'}`}>
                    {article.phase}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <i className="ri-heart-line w-3 h-3 flex items-center justify-center"></i>
                    <span className="text-xs font-medium">{article.likes}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${outcomeColors[article.outcome] || 'bg-gray-100 text-gray-800'}`}>
                    <i className={`${outcomeIcons[article.outcome]} w-3 h-3 flex items-center justify-center mr-1`}></i>
                    {article.outcome}
                  </span>
                </div>
              </div>

              {/* コンテンツ部分 */}
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-3 line-clamp-2 text-sm group-hover:text-orange-600 transition-colors leading-tight">
                  {article.title}
                </h4>
                
                <p className="text-gray-600 text-xs mb-4 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {article.categories.slice(0, 2).map((category, index) => (
                    <span key={index} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md border border-orange-100">
                      {category}
                    </span>
                  ))}
                  {article.categories.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      +{article.categories.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {article.author.charAt(0)}
                    </div>
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <span>{new Date(article.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>

              {/* ホバー時のアクセント */}
              <div className="h-1 bg-gradient-to-r from-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/articles" className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-200 cursor-pointer font-semibold shadow-lg">
          <span className="whitespace-nowrap">他の記事も見る</span>
          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
        </Link>
      </div>
    </div>
  );
}

const allRelatedArticles = [
  {
    id: '2',
    title: 'IT企業役員からヘルスケア起業：規制業界で学んだ事業開発の極意',
    summary: 'NTTデータで培った技術力を医療分野に応用。規制が厳しい業界での事業開発で直面した課題と、それを乗り越えるために必要だった視点の転換について。',
    author: '佐藤 美咲',
    likes: 189,
    phase: '開始期',
    outcome: '成功体験',
    categories: ['事業計画', '経理'],
    date: '2024-01-12'
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
    date: '2024-01-08'
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
    date: '2024-01-14'
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
    date: '2024-01-05'
  }
];