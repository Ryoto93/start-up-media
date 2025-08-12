
import Header from '@/components/Header';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { getAllPublishedArticles } from '@/lib/data/articles';

export default async function Home() {
  const all = await getAllPublishedArticles();
  const latest = all.slice(0, 12);
  // ひとまず最新記事をトレンド/人気にも再利用（将来は専用ロジックに分割）
  const trendingArticles = latest.slice(0, 4);
  const popularArticles = latest.slice(4, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - Completely Redesigned */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-orange-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{backgroundImage: `radial-gradient(circle at 20% 80%, transparent 20%, rgba(249, 115, 22, 0.1) 21%, rgba(249, 115, 22, 0.1) 25%, transparent 26%), radial-gradient(circle at 80% 20%, transparent 20%, rgba(249, 115, 22, 0.05) 21%, rgba(249, 115, 22, 0.05) 25%, transparent 26%)`}}></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 lg:pr-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium shadow-sm">
                <i className="ri-rocket-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                リアルな起業体験談プラットフォーム
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-gray-900">大手企業出身者の</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 font['Pacifico']">
                    起業ストーリーズ
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                  成功も失敗も包み隠さず。あなたの起業への一歩を後押しする、生の声と学びがここに。
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{all.length}</div>
                  <div className="text-sm text-gray-600">体験談</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{new Set(all.map(a => a.author)).size}</div>
                  <div className="text-sm text-gray-600">起業家</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{new Set(all.flatMap(a => a.categories)).size}</div>
                  <div className="text-sm text-gray-600">業界</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/articles" className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer whitespace-nowrap text-center overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    記事を読んでみる
                    <i className="ri-arrow-right-line ml-2 w-5 h-5 flex items-center justify-center group-hover:translate-x-1 transition-transform"></i>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link href="/profile" className="px-8 py-4 bg-white text-orange-600 border-2 border-orange-200 rounded-2xl font-semibold text-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 cursor-pointer whitespace-nowrap text-center shadow-sm hover:shadow-md">
                  体験談を投稿する
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-6">
                <div className="flex items-center text-sm text-gray-500">
                  <i className="ri-shield-check-line text-green-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                  匿名投稿可能
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="ri-user-heart-line text-orange-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                  実体験のみ掲載
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative lg:pl-8">
              {/* Main Image Container */}
              <div className="relative">
                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-lg p-4 rotate-[-5deg] hover:rotate-0 transition-transform duration-300 cursor-pointer z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                      <i className="ri-lightbulb-line text-white w-5 h-5 flex items-center justify-center"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">新着</div>
                      <div className="text-xs text-gray-600">最新の体験談</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 rotate-[8deg] hover:rotate-0 transition-transform duration-300 cursor-pointer z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                      <i className="ri-heart-line text-white w-5 h-5 flex items-center justify-center"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">人気</div>
                      <div className="text-xs text-gray-600">よく読まれています</div>
                    </div>
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Diverse%20group%20of%20young%20entrepreneurs%20collaborating%20in%20bright%20modern%20coworking%20space%2C%20people%20from%20different%20backgrounds%20working%20together%20on%20laptops%20and%20tablets%2C%20natural%20lighting%20streaming%20through%20large%20windows%2C%20plants%20and%20contemporary%20furniture%2C%20warm%20and%20welcoming%20atmosphere%20with%20orange%20accent%20colors%2C%20professional%20photography%20with%20soft%20focus%20background&width=600&height=500&seq=hero-main&orientation=portrait"
                    alt="起業家コミュニティ"
                    className="w-full h-[500px] object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Floating Stats */}
                <div className="absolute top-20 -right-8 bg-white rounded-2xl shadow-lg p-4 z-10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{all.reduce((s, a) => s + a.likes, 0)}</div>
                    <div className="text-xs text-gray-600">総いいね</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 fill-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <i className="ri-fire-line text-orange-500 mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"></i>
              <span className="hidden sm:inline">トレンド記事</span>
              <span className="sm:hidden">トレンド</span>
            </h2>
            <Link href="/articles" className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap flex items-center text-sm sm:text-base">
              <span className="hidden sm:inline">すべて見る</span>
              <span className="sm:hidden">すべて</span>
              <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingArticles.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <i className="ri-time-line text-orange-500 mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"></i>
              <span className="hidden sm:inline">最新記事</span>
              <span className="sm:hidden">最新</span>
            </h2>
            <Link href="/articles" className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap flex items-center text-sm sm:text-base">
              <span className="hidden sm:inline">すべて見る</span>
              <span className="sm:hidden">すべて</span>
              <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {latest.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <i className="ri-heart-line text-orange-500 mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"></i>
              <span className="hidden sm:inline">人気記事</span>
              <span className="sm:hidden">人気</span>
            </h2>
            <Link href="/articles" className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap flex items-center text-sm sm:text-base">
              <span className="hidden sm:inline">すべて見る</span>
              <span className="sm:hidden">すべて</span>
              <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {popularArticles.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            あなたの起業体験談を<br className="sm:hidden" />共有しませんか？
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            成功も失敗も、すべてが価値ある学びです。あなたの体験が、次の起業家の背中を押すかもしれません。
          </p>
          <Link href="/profile" className="bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-orange-600 transition-colors inline-block cursor-pointer whitespace-nowrap">
            体験談を投稿する
          </Link>
        </div>
      </section>
    </div>
  );
}
