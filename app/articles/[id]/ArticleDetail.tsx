
'use client';

import Header from '@/components/Header';
import ArticleContent from './ArticleContent';
import AuthorProfile from './AuthorProfile';
import EngagementSection from './EngagementSection';
import RelatedArticles from './RelatedArticles';
import NavigationArticles from './NavigationArticles';
import { useState, useEffect } from 'react';

interface ArticleDetailProps {
  articleId: string;
}

export default function ArticleDetail({ articleId }: ArticleDetailProps) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundArticle = allArticles.find((a) => a.id === articleId);
    setArticle(foundArticle);
    setLoading(false);
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="h-8 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-8"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-file-text-line text-gray-400 text-3xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">記事が見つかりません</h1>
            <p className="text-gray-600 mb-8">お探しの記事は存在しないか、削除された可能性があります。</p>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors cursor-pointer font-medium"
            >
              <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
              <span>戻る</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <Header />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleContent article={article} />
        <AuthorProfile author={article.authorProfile} />
        <EngagementSection articleId={article.id} initialLikes={article.likes} />
        <NavigationArticles currentAuthor={article.author} currentId={article.id} />
        <RelatedArticles currentArticle={article} />
      </article>
    </div>
  );
}

const allArticles = [
  {
    id: '1',
    title: '大手メーカーから食品スタートアップへ：失敗から学んだマーケティング戦略',
    summary: 'トヨタでの15年間の経験を活かし、地域密着型の食品事業を立ち上げました。しかし、最初の商品は大失敗。その経験から学んだ真のマーケティングとは？',
    content: `大手メーカーでの15年間が教えてくれたこと

トヨタ自動車で15年間、製造業のマーケティングに携わってきました。グローバル市場での競争戦略、ブランド構築、顧客分析など、多くの経験を積むことができました。

しかし、2023年8月に地域密着型の食品事業「地産地消フーズ」を立ち上げた際、これまでの経験が全く通用しないことを痛感したのです。

最初の大失敗：商品開発の落とし穴

自信を持って開発した第一弾商品「プレミアム地鶏カレー」は、見事に市場で失敗しました。

**失敗の要因：**
- 顧客ニーズの理解不足
- 価格設定の甘さ  
- 流通チャネルの軽視
- 地域特性の見落とし

製造業で培った「品質さえ良ければ売れる」という思い込みが、食品業界では全く通用しませんでした。

失敗から学んだ真のマーケティング

失敗を受けて、ゼロからマーケティング戦略を見直しました。

### 1. 顧客との直接対話

地域のスーパーや道の駅で、実際にお客様と話をしました。アンケートや市場調査では見えない、リアルな声を聞くことができました。

### 2. 小ロット・高頻度での仮説検証

大量生産ではなく、小ロットで様々な商品をテスト販売。お客様の反応を見ながら改良を重ねました。

### 3. 地域コミュニティとの連携

地元の農家さんや料理研究家と協力し、本当に地域に根ざした商品開発を行いました。

現在の成果

改良を重ねた「おばあちゃんの味シリーズ」は、地域で大好評をいただいています。

**具体的な成果：**
- 月売上500万円達成
- リピート率85%
- 地域メディア掲載5回
- 取扱店舗30店舗

これから起業する方へのアドバイス

大企業での経験は確かに財産ですが、それだけに頼ってはいけません。新しい業界では、謙虚に学ぶ姿勢が何より大切だと実感しています。

失敗を恐れず、小さく始めて大きく育てる。これが私が学んだ起業の極意です.`,
    author: '田中 健太',
    authorProfile: {
      name: '田中 健太',
      age: 42,
      career: 'トヨタ自動車 マーケティング部門 15年',
      bio: '製造業でのマーケティング経験を活かし、地域密着型の食品事業を展開。失敗から学んだ真のマーケティング手法で、地域に愛される商品づくりに取り組んでいます。',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20businessman%20in%20his%2040s%20with%20friendly%20smile%2C%20wearing%20casual%20business%20attire%2C%20clean%20white%20background%20with%20warm%20orange%20lighting%2C%20approachable%20entrepreneur%20portrait&width=120&height=120&seq=author1&orientation=squarish',
      entrepreneurshipStartDate: '2023-03-15',
      entrepreneurshipConsiderationStartDate: '2022-06-01',
    },
    likes: 234,
    phase: '成長期',
    outcome: '失敗体験',
    categories: ['マーケティング', '事業計画'],
    date: '2024-01-15',
    eventDate: '2023-08-15',
  },
  {
    id: '4',
    title: '起業を考え始めた日：安定を捨てる決断の裏側',
    summary: 'トヨタでの安定した生活を捨て、起業を決意するまでの心境の変化。家族との話し合い、将来への不安、そして一歩を踏み出す勇気について。',
    content: `起業への第一歩：考え始めた日のこと

2022年6月1日。この日が私の起業ジャーニーの始まりでした。トヨタ自動車で15年間働き、安定した生活を送っていた私が、なぜ起業を考えるようになったのか。その心境の変化を振り返ってみます。

きっかけは小さな違和感

毎日同じ通勤路、同じオフィス、同じ会議室。40代に差し掛かり、ふと「このまま定年まで同じことを繰り返すのか？」という疑問が頭をよぎりました。

**感じていた違和感：**
- 創造性を発揮する機会の減少
- 意思決定スピードの遅さ
- 新しい挑戦への制約
- 個人の成長の停滞感

家族との真剣な話し合い

起業を考え始めたとき、まず妻に相談しました。住宅ローンもあり、子供の教育費も必要。経済的な不安は計り知れませんでした。

「本当にやりたいなら、応援する。でも、しっかりと計画を立てて」

妻のこの言葉が、私の背中を押してくれました。

情報収集と自己分析の日々

起業を決意してから、毎日のように情報収集と自己分析を行いました。

### 1. 市場調査

食品業界の動向、地域密着ビジネスの可能性、競合他社の分析など、徹底的に調べました。

### 2. 自分の強みの再確認

トヨタでの経験で得たもの：
- マーケティング戦略立案
- プロジェクト管理能力
- 品質管理への意識
- チームマネジメント

### 3. 必要な資金の算出

初期投資、運転資金、生活費まで含めた詳細な資金計画を作成しました。

不安との戦い

毎晩、不安で眠れない日が続きました。

**主な不安：**
- 事業が失敗したらどうしよう
- 家族に迷惑をかけるのではないか
- 年齢的に今からで間に合うのか
- 大企業の看板なしでやっていけるのか

しかし、これらの不安よりも「やらない後悔」の方が大きいと感じました。

決断のとき

半年間の検討期間を経て、2022年12月に起業することを正式に決意しました。

「失敗を恐れていては、何も始まらない。まずは挑戦してみよう」

この気持ちが、全ての不安を上回りました。

これから起業を考える方へ

起業は人生の大きな転換点です。十分な準備と覚悟が必要ですが、年齢は関係ありません。大切なのは、自分自身に正直になることだと思います。

失敗を恐れず、小さく始めて大きく育てる。これが私が学んだ起業の極意です.`,
    author: '田中 健太',
    authorProfile: {
      name: '田中 健太',
      age: 42,
      career: 'トヨタ自動車 マーケティング部門 15年',
      bio: '製造業でのマーケティング経験を活かし、地域密着型の食品事業を展開。失敗から学んだ真のマーケティング手法で、地域に愛される商品づくりに取り組んでいます。',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20businessman%20in%20his%2040s%20with%20friendly%20smile%2C%20wearing%20casual%20business%20attire%2C%20clean%20white%20background%20with%20warm%20orange%20lighting%2C%20approachable%20entrepreneur%20portrait&width=120&height=120&seq=author1&orientation=squarish',
      entrepreneurshipStartDate: '2023-03-15',
      entrepreneurshipConsiderationStartDate: '2022-06-01',
    },
    likes: 89,
    phase: '起業検討期',
    outcome: 'その他',
    categories: ['マインドセット', '家族'],
    date: '2024-01-20',
    eventDate: '2022-06-01',
  },
  {
    id: '5',
    title: '退職届を出した日：15年間の会社員生活に別れを告げる',
    summary: '15年間勤めたトヨタに退職届を提出。上司や同僚の反応、最後の出勤日の気持ち、そして新たなスタートへの決意を綴ります。',
    content: `15年間の集大成：退職届提出の日

2023年3月15日。この日、私は15年間勤めたトヨタ自動車に退職届を提出しました。手が震えるほど緊張したあの瞬間を、今でも鮮明に覚えています。

上司への報告

直属の上司である部長に、まず個別に相談しました。

「田中さん、まさか起業するなんて思わなかった。でも、あなたらしい選択だと思います」

予想していた引き止めはなく、むしろ応援してくれたことに感動しました。

同僚たちの反応

同期や後輩たちに報告したときの反応は様々でした。

**ポジティブな反応：**
- 「すごいね、頑張って！」
- 「いつか一緒に仕事しよう」
- 「応援してるから」

**心配の声：**
- 「大丈夫？リスク高くない？」
- 「もったいない、せっかく順調なのに」
- 「失敗したらどうするの？」

どちらも私のことを思って言ってくれているのが分かり、有難い気持ちでいっぱいでした。

引き継ぎの日々

退職日まで2ヶ月間、丁寧な引き継ぎを行いました。

### 後輩への引き継ぎ

15年間で蓄積したノウハウ、人脈、プロジェクトの詳細など、すべてを後輩に伝えました。

「田中さんがいなくなるのは寂しいですが、教えていただいたことを活かして頑張ります」

後輩のこの言葉が、一番嬉しかったかもしれません。

### 取引先への挨拶回り

長年お世話になった取引先各社を回り、後任の紹介と挨拶を行いました。多くの方から激励の言葉をいただきました。

最後の出勤日

2023年5月15日。最後の出勤日の朝は、複雑な気持ちでした。

**感じていた気持ち：**
- 15年間の思い出への感謝
- 新しいスタートへの期待
- 不安と緊張
- 同僚たちへの愛情

送別会での涙

部署の皆さんが送別会を開いてくれました。普段は厳しい部長も、この日は涙を流してくれました。

「田中、お前が起業するなら必ず成功する。応援してるからな」

この言葉が、今でも私の支えになっています。

新たなスタートへの決意

トヨタでの15年間は、私にとってかけがえのない財産です。学んだこと、出会った人々、すべてが今の私を形作っています。

**これからの目標：**
- 地域に愛される商品を作る
- 雇用を創出し、地域に貢献する
- トヨタで学んだことを活かす
- 失敗を恐れず挑戦し続ける

会社員生活を振り返って

15年間の会社員生活は、決して無駄ではありませんでした。むしろ、起業家としての基盤を築いてくれた貴重な時間だったと思います。

安定を手放すことは怖いですが、新しい挑戦への期待の方が大きいです。トヨタで学んだ「改善」の精神を胸に、新たな道を歩んでいきます。
`,
    author: '田中 健太',
    authorProfile: {
      name: '田中 健太',
      age: 42,
      career: 'トヨタ自動車 マーケティング部門 15年',
      bio: '製造業でのマーケティング経験を活かし、地域密着型の食品事業を展開。失敗から学んだ真のマーケティング手法で、地域に愛される商品づくりに取り組んでいます。',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20businessman%20in%20his%2040s%20with%20friendly%20smile%2C%20wearing%20casual%20business%20attire%2C%20clean%20white%20background%20with%20warm%20orange%20lighting%2C%20approachable%20entrepreneur%20portrait&width=120&height=120&seq=author1&orientation=squarish',
      entrepreneurshipStartDate: '2023-03-15',
      entrepreneurshipConsiderationStartDate: '2022-06-01',
    },
    likes: 167,
    phase: '直前・直後',
    outcome: 'その他',
    categories: ['転職', 'マインドセット'],
    date: '2024-01-18',
    eventDate: '2023-03-15',
  },
  {
    id: '2',
    title: 'IT企業役員からヘルスケア起業：規制業界で学んだ事業開発の極意',
    summary: 'NTTデータで培った技術力を医療分野に応用。規制が厳しい業界での事業開発で直面した課題と、それを乗り越えるために必要だった視点の転換について。',
    content: `IT業界から医療業界への転身

NTTデータで15年間、大規模システム開発のプロジェクトマネージャーとして働いてきました。しかし、父の介護を通じて医療業界の課題を実感し、2023年9月にヘルスケアスタートアップ「メディケアテック」を立ち上げました。

規制業界での事業開発の難しさ

医療業界は、IT業界とは全く異なる世界でした。

**主な課題：**
- 厳格な法規制への対応
- 医療従事者との信頼関係構築
- 長期間の承認プロセス
- 高い安全性要求

スピード重視のIT業界の常識が、全く通用しないことを痛感しました。

視点の転換：技術から人へ

最初は技術力で勝負しようとしていましたが、医療業界では「人」が最も大切だと気づきました。

### 1. 医療従事者との対話

月に20回以上、病院や診療所を訪問し、現場の声を聞きました。技術者目線ではなく、医療従事者の立場で課題を理解することに努めました。

### 2. 段階的な製品開発

一気に完璧な製品を作るのではなく、小さな課題から順番に解決していく戦略に転換しました。

### 3. 規制当局との早期コミュニケーション

承認プロセスを後回しにせず、開発初期段階から規制当局と対話を重ねました。

現在の成果と今後の展望

現在、電子カルテ連携システムの開発を進めており、3つの病院でパイロット導入が決定しています。

**具体的な成果：**
- パイロット導入病院：3施設
- 医師からの満足度：92%
- 業務効率化：平均30%向上
- 次年度の本格導入予定：10施設

異業界転身を考える方へ

規制業界への参入は確かに困難ですが、だからこそ大きなチャンスがあります。技術だけでなく、業界の文化や価値観を理解することが成功の鍵だと思います.`,
    author: '佐藤 美咲',
    authorProfile: {
      name: '佐藤 美咲',
      age: 39,
      career: 'NTTデータ システム開発部門 15年',
      bio: 'IT業界での豊富な経験を医療分野に活用。規制業界特有の課題を乗り越え、医療従事者に寄り添ったヘルスケアソリューションの開発に取り組んでいます。',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20businesswoman%20in%20her%20late%2030s%20with%20confident%20smile%2C%20wearing%20modern%20business%20attire%2C%20clean%20white%20background%20with%20warm%20lighting%2C%20healthcare%20technology%20entrepreneur%20portrait&width=120&height=120&seq=author2&orientation=squarish',
      entrepreneurshipStartDate: '2023-09-20',
      entrepreneurshipConsiderationStartDate: '2023-01-15',
    },
    likes: 189,
    phase: '開始期',
    outcome: '成功体験',
    categories: ['事業計画', '経理'],
    date: '2024-01-12',
    eventDate: '2023-09-20',
  },
  {
    id: '3',
    title: '銀行員からフィンテック創業：金融業界の常識を覆す挑戦',
    summary: '三菱UFJ銀行での10年間で感じた金融業界の課題を解決するべく、個人向け資産管理アプリを開発。既存金融機関との競合で学んだ差別化戦略。',
    content: `銀行員として見た金融業界の課題

三菱UFJ銀行で10年間、個人向け金融商品の企画・販売に携わってきました。多くのお客様と接する中で、既存の金融サービスでは解決できない課題があることを実感していました。

フィンテック起業への決断

2023年11月、個人向け資産管理アプリ「マネーガイド」の開発を開始しました。

**起業の背景：**
- お客様の投資リテラシー不足
- 複雑すぎる金融商品
- 手数料の不透明性
- パーソナライズされていないアドバイス

これらの課題を技術で解決したいと考えました。

既存金融機関との差別化戦略

大手銀行との競合は避けられませんでした。差別化のポイントは以下の通りです。

### 1. 完全透明性の追求

すべての手数料を明示し、隠れコストを一切排除しました。

### 2. AI活用のパーソナライゼーション

個人の収入、支出、リスク許容度に基づいた完全オーダーメイドのアドバイスを提供。

### 3. 金融教育の重視

投資判断を押し付けるのではなく、お客様自身が理解して選択できるよう教育コンテンツを充実させました。

現在の成果

ベータ版リリースから半年で、順調にユーザーを獲得しています。

**具体的な成果：**
- ユーザー数：5,000人
- 平均運用益：年利8.2%
- ユーザー満足度：4.6/5.0
- リテンション率：78%

金融業界の常識を覆す挑戦は、まだ始まったばかりです.`,
    author: '山田 雄介',
    authorProfile: {
      name: '山田 雄介',
      age: 35,
      career: '三菱UFJ銀行 個人金融部門 10年',
      bio: '銀行での豊富な金融知識と経験を活かし、個人投資家向けの革新的な資産管理サービスを開発。金融の民主化を目指しています。',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20businessman%20in%20his%20mid-30s%20with%20serious%20but%20approachable%20expression%2C%20wearing%20modern%20business%20suit%2C%20clean%20white%20background%20with%20professional%20lighting%2C%20fintech%20entrepreneur%20portrait&width=120&height=120&seq=author3&orientation=squarish',
      entrepreneurshipStartDate: '2023-11-10',
      entrepreneurshipConsiderationStartDate: '2023-08-01',
    },
    likes: 156,
    phase: '直前・直後',
    outcome: 'その他',
    categories: ['開発', '営業'],
    date: '2024-01-10',
    eventDate: '2023-11-10',
  },
];
