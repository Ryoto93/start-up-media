import { Article } from '@/types';
import { createStaticClient } from '@/lib/supabase/server';

// 記事データの集約（モックデータ: 将来的な削除候補。現在は保持のみ）
const allArticles: Article[] = [
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
- 製造業の品質管理感覚で作った高品質商品が、価格競争力に欠けていた
- 地域の飲食店との連携が不十分で、地産地消の魅力を活かせなかった
- 顧客のニーズ調査が表面的で、本当の課題を捉えられていなかった

この失敗から学んだことは、製造業と食品業界では顧客の価値観が全く異なるということです。

**学んだ教訓：**
1. 品質だけでなく、価格と地域性のバランスが重要
2. 地元の飲食店との連携が成功の鍵
3. 顧客の声を深く聞くことの重要性

現在は、これらの教訓を活かして、地域密着型の食品事業を軌道に乗せることができています。`,
    author: '田中 健太',
    likes: 234,
    phase: '成長期',
    outcome: '失敗体験',
    categories: ['マーケティング', '事業計画'],
    date: '2024-01-15',
    imageUrl: '/images/article1.jpg',
    eventDate: '2023-08-15',
    authorProfile: {
      name: '田中 健太',
      age: 42,
      career: 'トヨタ自動車 15年',
      bio: '製造業のマーケティング経験を活かし、地域密着型の食品事業を立ち上げ。失敗から学んだ経験を共有することで、同じ道を歩む起業家のサポートを目指しています。',
      avatar: '/images/avatar1.jpg',
      entrepreneurshipStartDate: '2023-08-15',
      entrepreneurshipConsiderationStartDate: '2023-01-01'
    }
  },
  {
    id: '2',
    title: 'IT企業役員からヘルスケア起業：規制業界で学んだ事業開発の極意',
    summary: 'NTTデータで培った技術力を医療分野に応用。規制が厳しい業界での事業開発で直面した課題と、それを乗り越えるために必要だった視点の転換について。',
    content: `IT業界から医療業界への転身

NTTデータで20年間、システム開発とプロジェクトマネジメントに携わってきました。技術力とマネジメントスキルを活かして、医療分野での事業開発に挑戦することにしました。

**直面した課題：**
- 医療業界の厳しい規制とコンプライアンス要件
- 医師や看護師とのコミュニケーションの難しさ
- 患者のプライバシー保護の重要性

**解決策：**
1. 医療専門家との連携体制の構築
2. 段階的な規制対応の実装
3. ユーザビリティを重視したUI/UX設計

現在は、AIを活用した健康管理アプリ「HealthAI」を開発し、多くのユーザーに利用していただいています。`,
    author: '佐藤 美咲',
    likes: 189,
    phase: '開始期',
    outcome: '成功体験',
    categories: ['事業計画', '経理'],
    date: '2024-01-12',
    imageUrl: '/images/article2.jpg',
    eventDate: '2023-09-20',
    authorProfile: {
      name: '佐藤 美咲',
      age: 38,
      career: 'NTTデータ 20年',
      bio: 'IT業界での経験を活かし、医療分野での事業開発に挑戦。技術と医療の融合で、より良いヘルスケアサービスを提供することを目指しています。',
      avatar: '/images/avatar2.jpg',
      entrepreneurshipStartDate: '2023-09-20',
      entrepreneurshipConsiderationStartDate: '2023-03-01'
    }
  },
  {
    id: '3',
    title: '銀行員からフィンテック創業：金融業界の常識を覆す挑戦',
    summary: '三菱UFJ銀行での10年間で感じた金融業界の課題を解決するべく、個人向け資産管理アプリを開発。既存金融機関との競合で学んだ差別化戦略。',
    content: `金融業界の課題を解決するフィンテック

三菱UFJ銀行で10年間、個人向け金融サービスに携わってきました。その経験で感じた課題を解決するべく、個人向け資産管理アプリ「MoneyFlow」を開発しました。

**金融業界の課題：**
- 複雑な手続きと長い待ち時間
- 個人向けサービスの画一性
- デジタル化の遅れ

**差別化戦略：**
1. シンプルで直感的なUI/UX
2. AIを活用したパーソナライズドなアドバイス
3. 24時間365日のサポート体制

既存金融機関との競合では、スピードと柔軟性を武器に差別化を図っています。`,
    author: '山田 雄介',
    likes: 156,
    phase: '直前・直後',
    outcome: 'その他',
    categories: ['開発', '営業'],
    date: '2024-01-10',
    imageUrl: '/images/article3.jpg',
    eventDate: '2023-11-10',
    authorProfile: {
      name: '山田 雄介',
      age: 35,
      career: '三菱UFJ銀行 10年',
      bio: '金融業界での経験を活かし、フィンテックで金融サービスの課題を解決。より使いやすく、個人に寄り添った金融サービスを提供することを目指しています。',
      avatar: '/images/avatar3.jpg',
      entrepreneurshipStartDate: '2023-11-10',
      entrepreneurshipConsiderationStartDate: '2023-06-01'
    }
  },
  {
    id: '4',
    title: 'コンサル出身者が語る：戦略立案スキルを活かした教育事業の立ち上げ',
    summary: 'マッキンゼーでの戦略コンサルティング経験を活かし、オンライン教育プラットフォームを創業。論理的思考だけでは解決できなかった現場の課題とは？',
    content: `コンサルティングスキルを教育事業に応用

マッキンゼーで5年間、戦略コンサルティングに携わってきました。論理的思考と戦略立案スキルを活かして、オンライン教育プラットフォーム「EduLogic」を創業しました。

**コンサルティングスキルの活かし方：**
- 市場分析と競合調査
- ビジネスモデルの設計
- 成長戦略の立案

**現場の課題：**
1. 教育現場の複雑性
2. 生徒一人ひとりの個性への対応
3. 教師の負担軽減

論理的思考だけでは解決できない、教育現場の人間的な側面を理解することの重要性を学びました。`,
    author: '鈴木 翔太',
    likes: 198,
    phase: '起業検討期',
    outcome: '成功体験',
    categories: ['事業計画', 'マーケティング'],
    date: '2024-01-08',
    imageUrl: '/images/article4.jpg',
    eventDate: '2023-07-25',
    authorProfile: {
      name: '鈴木 翔太',
      age: 32,
      career: 'マッキンゼー 5年',
      bio: '戦略コンサルティングの経験を活かし、教育事業を創業。論理的思考と教育現場の実態を融合させた、革新的な教育サービスを提供することを目指しています。',
      avatar: '/images/avatar4.jpg',
      entrepreneurshipStartDate: '2023-07-25',
      entrepreneurshipConsiderationStartDate: '2023-02-01'
    }
  },
  {
    id: '5',
    title: '商社マンから農業テック：地方創生を目指す新規事業への挑戦',
    summary: '伊藤忠商事での海外事業経験を活かし、スマート農業システムを開発。都市部と地方の格差を埋める技術で、持続可能な農業の実現を目指しています。',
    content: `海外事業経験を農業テックに応用

伊藤忠商事で12年間、海外事業に携わってきました。その経験を活かして、スマート農業システム「AgriTech」を開発し、地方創生に貢献することを目指しています。

**海外事業で学んだこと：**
- グローバルな視点での事業展開
- 現地のニーズに合わせた製品開発
- 持続可能なビジネスモデルの重要性

**農業テックでの取り組み：**
1. IoTセンサーによる環境モニタリング
2. AIを活用した収穫時期の最適化
3. データドリブンな農業経営支援

都市部と地方の格差を埋める技術で、持続可能な農業を目指しています。`,
    author: '松本 裕子',
    likes: 87,
    phase: '成長期',
    outcome: '成功体験',
    categories: ['開発', '事業計画'],
    date: '2024-01-20',
    imageUrl: '/images/article5.jpg',
    eventDate: '2023-06-12',
    authorProfile: {
      name: '松本 裕子',
      age: 40,
      career: '伊藤忠商事 12年',
      bio: '海外事業の経験を活かし、農業テックで地方創生に貢献。技術の力で持続可能な農業を実現し、地方の活性化を目指しています。',
      avatar: '/images/avatar5.jpg',
      entrepreneurshipStartDate: '2023-06-12',
      entrepreneurshipConsiderationStartDate: '2023-01-01'
    }
  },
  {
    id: '6',
    title: '大手保険会社からインシュアテック：顧客体験を革新する新サービス',
    summary: '東京海上での20年の経験で感じた保険業界の課題。AIを活用した保険査定システムで、お客様の待ち時間を90%削減することに成功しました。',
    content: `保険業界の課題を技術で解決

東京海上で20年間、保険商品の開発と顧客サービスに携わってきました。その経験で感じた課題を解決するべく、AIを活用した保険査定システム「InsureAI」を開発しました。

**保険業界の課題：**
- 査定の待ち時間が長い
- 手続きが複雑
- 顧客のニーズに合わない商品

**解決策：**
1. AIによる自動査定システム
2. シンプルな手続きフロー
3. パーソナライズドな商品提案

お客様の待ち時間を90%削減し、より良い顧客体験を提供することができています。`,
    author: '高橋 慎一',
    likes: 143,
    phase: '開始期',
    outcome: '成功体験',
    categories: ['開発', '営業'],
    date: '2024-01-18',
    imageUrl: '/images/article6.jpg',
    eventDate: '2023-10-05',
    authorProfile: {
      name: '高橋 慎一',
      age: 45,
      career: '東京海上 20年',
      bio: '保険業界での経験を活かし、インシュアテックで顧客体験を革新。AIの力で、より使いやすく、顧客に寄り添った保険サービスを提供することを目指しています。',
      avatar: '/images/avatar6.jpg',
      entrepreneurshipStartDate: '2023-10-05',
      entrepreneurshipConsiderationStartDate: '2023-04-01'
    }
  },
  {
    id: '7',
    title: '製薬会社研究員からバイオベンチャー：新薬開発への情熱を形に',
    summary: '武田薬品での研究開発経験を基に、希少疾患向けの新薬開発に特化したバイオベンチャーを設立。資金調達の難しさと研究への想いについて語ります。',
    content: `研究開発の情熱を起業に

武田薬品で15年間、新薬の研究開発に携わってきました。その経験を基に、希少疾患向けの新薬開発に特化したバイオベンチャー「RareCure」を設立しました。

**研究開発で学んだこと：**
- 科学的根拠に基づく開発プロセス
- 長期的な視点での事業計画
- チームワークの重要性

**起業での課題：**
1. 資金調達の難しさ
2. 規制対応の複雑さ
3. 研究と事業のバランス

研究への情熱と起業家精神を両立させることで、患者さんのために価値のある新薬を開発することを目指しています。`,
    author: '小林 真理',
    likes: 92,
    phase: '直前・直後',
    outcome: 'その他',
    categories: ['事業計画', '経理'],
    date: '2024-01-16',
    imageUrl: '/images/article7.jpg',
    eventDate: '2023-09-30',
    authorProfile: {
      name: '小林 真理',
      age: 43,
      career: '武田薬品 15年',
      bio: '新薬研究開発の経験を活かし、希少疾患向けの新薬開発に特化したバイオベンチャーを設立。患者さんのために価値のある新薬を開発することを目指しています。',
      avatar: '/images/avatar7.jpg',
      entrepreneurshipStartDate: '2023-09-30',
      entrepreneurshipConsiderationStartDate: '2023-05-01'
    }
  },
  {
    id: '8',
    title: '大手小売りからEコマース：オムニチャネル戦略で差別化を図る',
    summary: 'イオングループでの店舗運営経験を活かし、リアル店舗とデジタルを融合したEコマースプラットフォームを開発。従来の小売業との違いとは？',
    content: `リアルとデジタルの融合

イオングループで18年間、店舗運営とマーケティングに携わってきました。その経験を活かして、リアル店舗とデジタルを融合したEコマースプラットフォーム「OmniShop」を開発しました。

**小売業で学んだこと：**
- 顧客の購買行動の理解
- 在庫管理の重要性
- 顧客サービスの質

**オムニチャネル戦略：**
1. オンラインとオフラインのシームレスな連携
2. 顧客データの統合活用
3. パーソナライズドな商品提案

従来の小売業では実現できなかった、顧客一人ひとりに最適化されたショッピング体験を提供しています。`,
    author: '森田 大輔',
    likes: 76,
    phase: '起業検討期',
    outcome: '失敗体験',
    categories: ['マーケティング', '営業'],
    date: '2024-01-14',
    imageUrl: '/images/article8.jpg',
    eventDate: '2023-12-01',
    authorProfile: {
      name: '森田 大輔',
      age: 41,
      career: 'イオングループ 18年',
      bio: '小売業での経験を活かし、オムニチャネル戦略でEコマースを創業。リアルとデジタルを融合させた、革新的なショッピング体験を提供することを目指しています。',
      avatar: '/images/avatar8.jpg',
      entrepreneurshipStartDate: '2023-12-01',
      entrepreneurshipConsiderationStartDate: '2023-07-01'
    }
  },
  {
    id: '9',
    title: '外資系投資銀行からSaaS起業：B2B営業で学んだ顧客の本質',
    summary: 'ゴールドマン・サックスでの経験を活かし、中小企業向けの業務効率化SaaSを開発。投資銀行で培った営業スキルが、どのように起業に活かされたのか。',
    content: `投資銀行の営業スキルをSaaSに応用

ゴールドマン・サックスで8年間、企業向け金融サービスに携わってきました。その経験を活かして、中小企業向けの業務効率化SaaS「BizFlow」を開発しました。

**投資銀行で学んだこと：**
- 顧客の本質的なニーズの理解
- 複雑な商品の分かりやすい説明
- 長期的な顧客関係の構築

**SaaSでの活かし方：**
1. 顧客の業務課題の深掘り
2. ROIを重視した提案
3. 継続的なサポート体制

投資銀行で培った営業スキルが、B2B SaaSの営業で大いに活かされています。`,
    author: '渡辺 亮太',
    likes: 312,
    phase: '成長期',
    outcome: '成功体験',
    categories: ['営業', 'マーケティング'],
    date: '2024-01-05',
    imageUrl: '/images/article9.jpg',
    eventDate: '2023-05-18',
    authorProfile: {
      name: '渡辺 亮太',
      age: 36,
      career: 'ゴールドマン・サックス 8年',
      bio: '投資銀行での営業経験を活かし、中小企業向けの業務効率化SaaSを開発。顧客の本質的なニーズを理解し、価値のあるソリューションを提供することを目指しています。',
      avatar: '/images/avatar9.jpg',
      entrepreneurshipStartDate: '2023-05-18',
      entrepreneurshipConsiderationStartDate: '2022-12-01'
    }
  },
  {
    id: '10',
    title: '総合商社から再生可能エネルギー：ESG投資の波に乗る新事業',
    summary: '三井物産でのエネルギー事業経験を基に、太陽光発電システムの開発・販売事業を立ち上げ。ESG投資が注目される中での事業戦略について詳しく解説。',
    content: `エネルギー事業から再生可能エネルギーへ

三井物産で16年間、エネルギー事業に携わってきました。その経験を基に、太陽光発電システムの開発・販売事業「SolarTech」を立ち上げました。

**エネルギー事業で学んだこと：**
- エネルギー供給の安定性の重要性
- 規制対応の複雑さ
- 長期的な事業計画の必要性

**ESG投資への対応：**
1. 環境負荷の低減
2. 社会的価値の創出
3. ガバナンスの透明性

ESG投資が注目される中で、持続可能なエネルギー事業を展開しています。`,
    author: '中村 優花',
    likes: 287,
    phase: '開始期',
    outcome: '成功体験',
    categories: ['事業計画', '経理'],
    date: '2024-01-03',
    imageUrl: '/images/article10.jpg',
    eventDate: '2023-08-22',
    authorProfile: {
      name: '中村 優花',
      age: 39,
      career: '三井物産 16年',
      bio: 'エネルギー事業の経験を活かし、再生可能エネルギー事業を創業。ESG投資の波に乗り、持続可能な社会の実現に貢献することを目指しています。',
      avatar: '/images/avatar10.jpg',
      entrepreneurshipStartDate: '2023-08-22',
      entrepreneurshipConsiderationStartDate: '2023-02-01'
    }
  },
  {
    id: '11',
    title: 'メガバンクからフィナンシャルプランニング：個人の資産形成をサポート',
    summary: 'みずほ銀行での個人営業経験を活かし、AIを活用したパーソナライズド投資アドバイスサービスを開発。従来の金融サービスとの差別化ポイント。',
    content: `個人営業からフィナンシャルプランニングへ

みずほ銀行で14年間、個人向け金融サービスに携わってきました。その経験を活かして、AIを活用したパーソナライズド投資アドバイスサービス「WealthAI」を開発しました。

**銀行での経験：**
- 顧客の資産状況の理解
- リスク管理の重要性
- 長期的な資産形成のサポート

**差別化ポイント：**
1. AIによる個別最適化
2. 透明性の高い手数料体系
3. 継続的なサポート体制

従来の金融サービスでは実現できなかった、個人一人ひとりに最適化された投資アドバイスを提供しています。`,
    author: '加藤 直樹',
    likes: 265,
    phase: '成長期',
    outcome: 'その他',
    categories: ['開発', '営業'],
    date: '2024-01-01',
    imageUrl: '/images/article11.jpg',
    eventDate: '2023-04-10',
    authorProfile: {
      name: '加藤 直樹',
      age: 37,
      career: 'みずほ銀行 14年',
      bio: '個人向け金融サービスの経験を活かし、AIを活用したフィナンシャルプランニングサービスを開発。個人一人ひとりの資産形成をサポートすることを目指しています。',
      avatar: '/images/avatar11.jpg',
      entrepreneurshipStartDate: '2023-04-10',
      entrepreneurshipConsiderationStartDate: '2022-11-01'
    }
  },
  {
    id: '12',
    title: '大手広告代理店からマーケティングテック：データドリブンな広告運用',
    summary: '電通でのデジタルマーケティング経験を基に、AI駆動型の広告運用プラットフォームを開発。従来の広告業界では実現できなかった精度の高いターゲティング。',
    content: `広告業界からマーケティングテックへ

電通で11年間、デジタルマーケティングに携わってきました。その経験を基に、AI駆動型の広告運用プラットフォーム「AdTech Pro」を開発しました。

**広告業界で学んだこと：**
- クリエイティブの重要性
- ターゲティングの精度
- ROIの測定と改善

**AI駆動型の特徴：**
1. 機械学習による最適化
2. リアルタイムでの調整
3. データドリブンな意思決定

従来の広告業界では実現できなかった、精度の高いターゲティングと効率的な広告運用を実現しています。`,
    author: '井上 沙織',
    likes: 243,
    phase: '直前・直後',
    outcome: '失敗体験',
    categories: ['マーケティング', '開発'],
    date: '2023-12-28',
    imageUrl: '/images/article12.jpg',
    eventDate: '2023-11-15',
    authorProfile: {
      name: '井上 沙織',
      age: 34,
      career: '電通 11年',
      bio: 'デジタルマーケティングの経験を活かし、AI駆動型の広告運用プラットフォームを開発。データドリブンな広告運用で、より効率的なマーケティングを実現することを目指しています。',
      avatar: '/images/avatar12.jpg',
      entrepreneurshipStartDate: '2023-11-15',
      entrepreneurshipConsiderationStartDate: '2023-06-01'
    }
  }
];

type ArticleRow = {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string | null;
  author_id: string | null;
  likes: number | null;
  phase: string;
  outcome: string;
  categories: string[];
  date: string;
  event_date: string | null;
  actual_event_date: string | null;
  image_url: string | null;
  created_at?: string;
  is_published?: boolean | null;
  // likes_count カラムを併用（移行互換）
  likes_count?: number | null;
};

function mapRowToArticle(row: ArticleRow, profile?: { full_name: string | null; avatar_url: string | null; username?: string | null }): Article {
  const authorName = profile?.full_name ?? row.author ?? '匿名';
  const likesCount = (row as any).likes_count ?? row.likes ?? 0;
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    content: row.content,
    author: authorName,
    likes: typeof likesCount === 'number' ? likesCount : 0,
    phase: row.phase,
    outcome: row.outcome,
    categories: row.categories ?? [],
    date: row.date,
    imageUrl: row.image_url ?? '',
    eventDate: row.actual_event_date ?? row.event_date ?? row.date,
    authorProfile: {
      name: authorName,
      age: 0,
      career: '',
      bio: '',
      avatar: profile?.avatar_url ?? '',
      entrepreneurshipStartDate: row.actual_event_date ?? row.event_date ?? '',
      entrepreneurshipConsiderationStartDate: '',
    },
  };
}

// 全記事を取得する関数（Supabase）
export async function getAllArticles(): Promise<Article[]> {
  try {
    // Articles are public; avoid cookies during SSG/SSR
    const supabase = createStaticClient();

    // まず actual_event_date でのソートを試みる
    let { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('actual_event_date', { ascending: false });

    // カラムが存在しない場合は date でフォールバック
    if (error && /does not exist/i.test(error.message)) {
      const fallback = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });
      articles = fallback.data as any;
      error = fallback.error as any;
    }

    if (error) {
      console.error('Failed to fetch articles:', error.message);
      return [];
    }

    if (!articles || articles.length === 0) {
      return [];
    }

    // プロファイルをまとめて取得して擬似JOIN
    const authorIds = Array.from(
      new Set((articles as ArticleRow[]).map((a) => a.author_id).filter((v): v is string => !!v))
    );

    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', authorIds);

      if (profilesError) {
        console.warn('Failed to fetch profiles:', profilesError.message);
      } else if (profiles) {
        profilesMap = new Map(profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url }]));
      }
    }

    return (articles as ArticleRow[]).map((row) =>
      mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined)
    );
  } catch (e) {
    console.error('Unexpected error in getAllArticles:', e);
    return [];
  }
}

// 指定されたIDの記事を取得する関数（Supabase）
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    // Public read
    const supabase = createStaticClient();

    const { data: row, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Failed to fetch article by id:', error.message);
      return null;
    }

    if (!row) return null;

    let profile: { full_name: string | null; avatar_url: string | null } | undefined = undefined;
    const authorId = (row as ArticleRow).author_id;
    if (authorId) {
      const { data: p, error: pErr } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', authorId)
        .maybeSingle();
      if (!pErr && p) {
        profile = { full_name: (p as any).full_name, avatar_url: (p as any).avatar_url };
      }
    }

    return mapRowToArticle(row as ArticleRow, profile);
  } catch (e) {
    console.error('Unexpected error in getArticleById:', e);
    return null;
  }
}

// 記事ID一覧を取得する関数（静的生成用, Supabase）
export async function getAllArticleIds() {
  try {
    // Use a static client in SSG context to avoid cookies() requirement
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('articles')
      .select('id');

    if (error) {
      console.error('Failed to fetch article ids:', error.message);
      return [] as { id: string }[];
    }

    return (data ?? []).map((a: any) => ({ id: String(a.id) }));
  } catch (e) {
    console.error('Unexpected error in getAllArticleIds:', e);
    return [] as { id: string }[];
  }
}

// 記事の検索・フィルタリング・ソート（モックデータでのローカル動作用）
export async function searchArticles(filters: {
  phase?: string;
  outcome?: string;
  categories?: string[];
  searchKeyword?: string;
  sortBy?: string;
}): Promise<Article[]> {
  let filtered = [...allArticles];

  if (filters.phase) {
    filtered = filtered.filter(article => article.phase === filters.phase);
  }

  if (filters.outcome) {
    filtered = filtered.filter(article => article.outcome === filters.outcome);
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(article => 
      filters.categories!.some((category: string) => article.categories.includes(category))
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

  return filtered;
}

// NEW: 特定のユーザーの投稿記事を取得（出来事日降順）
export async function getArticlesByAuthorId(authorId: string): Promise<Article[]> {
  try {
    const supabase = createStaticClient();

    // try ordering by actual_event_date desc first
    let { data: rows, error } = await supabase
      .from('articles')
      .select('*')
      .eq('author_id', authorId)
      .order('actual_event_date', { ascending: false });

    if (error && /does not exist/i.test(error.message)) {
      const fallback = await supabase
        .from('articles')
        .select('*')
        .eq('author_id', authorId)
        .order('event_date', { ascending: false });
      rows = fallback.data as any;
      error = fallback.error as any;
    }

    if (error) {
      console.error('Failed to fetch articles by author:', error.message);
      return [];
    }

    const articles = (rows ?? []) as ArticleRow[];
    if (articles.length === 0) return [];

    const authorIds = Array.from(new Set(articles.map(a => a.author_id).filter((v): v is string => !!v)));
    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null; username?: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, username')
        .in('id', authorIds);
      if (pErr) {
        console.warn('Failed to fetch profiles for author join:', pErr.message);
      } else if (profiles) {
        profilesMap = new Map(
          profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url, username: p.username }])
        );
      }
    }

    return articles.map(row => mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined));
  } catch (e) {
    console.error('Unexpected error in getArticlesByAuthorId:', e);
    return [];
  }
}

// NEW: 公開記事すべて（作成日降順）
export async function getAllPublishedArticles(): Promise<Article[]> {
  try {
    const supabase = createStaticClient();

    const { data: rows, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch published articles:', error.message);
      return [];
    }

    const articles = (rows ?? []) as ArticleRow[];
    if (articles.length === 0) return [];

    const authorIds = Array.from(new Set(articles.map(a => a.author_id).filter((v): v is string => !!v)));
    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null; username?: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, username')
        .in('id', authorIds);
      if (pErr) {
        console.warn('Failed to fetch profiles for published join:', pErr.message);
      } else if (profiles) {
        profilesMap = new Map(
          profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url, username: p.username }])
        );
      }
    }

    return articles.map(row => mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined));
  } catch (e) {
    console.error('Unexpected error in getAllPublishedArticles:', e);
    return [];
  }
} 