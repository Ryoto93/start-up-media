
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  eventDate: string;
  phase: string;
  categories: string[];
  outcome: string;
  isPublished: boolean;
}

export default function CreateArticleForm() {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    summary: '',
    content: '',
    eventDate: '',
    phase: '',
    categories: [],
    outcome: '',
    isPublished: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const phases = [
    '起業検討期',
    '起業直前・直後', 
    '開始期',
    '成長期',
    '拡大期'
  ];

  const categoryOptions = [
    '営業',
    'マーケ',
    '事業計画',
    '経理',
    '開発',
    '雑務'
  ];

  const outcomes = [
    '成功',
    '失敗',
    '学び',
    '進行中'
  ];

  const handleInputChange = (field: keyof ArticleFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // バリデーション
    if (!formData.title.trim() || !formData.content.trim() || !formData.eventDate || !formData.phase) {
      alert('必須項目を入力してください');
      setIsSubmitting(false);
      return;
    }

    try {
      // TODO: Supabase実装時にデータ保存処理を追加
      console.log('記事データ:', formData);
      
      // 成功メッセージ表示
      setTimeout(() => {
        setIsSubmitting(false);
        alert('記事を投稿しました！');
        // プロフィールページにリダイレクト
        window.location.href = '/profile';
      }, 1500);
      
    } catch (error) {
      console.error('投稿エラー:', error);
      setIsSubmitting(false);
      alert('投稿に失敗しました。もう一度お試しください。');
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case '起業検討期': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '起業直前・直後': return 'bg-green-100 text-green-800 border-green-200';
      case '開始期': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '成長期': return 'bg-purple-100 text-purple-800 border-purple-200';
      case '拡大期': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      '営業': 'bg-red-50 text-red-700 border-red-200',
      'マーケ': 'bg-pink-50 text-pink-700 border-pink-200',
      '事業計画': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      '経理': 'bg-green-50 text-green-700 border-green-200',
      '開発': 'bg-blue-50 text-blue-700 border-blue-200',
      '雑務': 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case '成功': return 'ri-trophy-line';
      case '失敗': return 'ri-close-circle-line';
      case '学び': return 'ri-lightbulb-line';
      case '進行中': return 'ri-time-line';
      default: return 'ri-question-line';
    }
  };

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowPreview(false)}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer text-sm sm:text-base"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                編集に戻る
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-4 sm:px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer text-sm sm:text-base"
                >
                  {isSubmitting ? '投稿中...' : '投稿する'}
                </button>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">{formData.title}</h1>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-sm font-medium border ${getPhaseColor(formData.phase)}`}>
                  {formData.phase}
                </span>
                {formData.categories.map(category => (
                  <span key={category} className={`px-2 py-1 rounded text-sm font-medium border ${getCategoryColor(category)}`}>
                    {category}
                  </span>
                ))}
                {formData.outcome && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    <i className={`${getOutcomeIcon(formData.outcome)} text-sm`}></i>
                    {formData.outcome}
                  </span>
                )}
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <i className="ri-calendar-line mr-2"></i>
                <span>
                  {new Date(formData.eventDate).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {formData.summary && (
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{formData.summary}</p>
              )}
            </div>

            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm sm:text-base">
                {formData.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* メインフォーム */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                記事タイトル *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="起業での出来事や学びのタイトルを入力してください"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-base sm:text-lg"
                maxLength={100}
                required
              />
              <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100文字</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                記事の要約
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                placeholder="記事の内容を簡潔にまとめてください（200文字以内）"
                rows={3}
                maxLength={200}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.summary.length}/200文字</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                記事本文 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="あなたの起業ジャーニーでの体験、学び、感想を詳しく書いてください。具体的なエピソードや数字があると読者により伝わりやすくなります。"
                rows={12}
                maxLength={5000}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none text-sm sm:text-base"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{formData.content.length}/5,000文字</p>
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                出来事の日付 *
              </label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => handleInputChange('eventDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                起業フェーズ *
              </label>
              <div className="space-y-2">
                {phases.map(phase => (
                  <label key={phase} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="phase"
                      value={phase}
                      checked={formData.phase === phase}
                      onChange={(e) => handleInputChange('phase', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`flex-1 px-3 py-2.5 sm:py-2 border rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      formData.phase === phase 
                        ? 'border-orange-500 bg-orange-50 text-orange-700' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}>
                      {phase}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                カテゴリー（複数選択可）
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-2.5 sm:py-2 border rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      formData.categories.includes(category)
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                結果・成果
              </label>
              <div className="grid grid-cols-2 gap-2">
                {outcomes.map(outcome => (
                  <button
                    key={outcome}
                    type="button"
                    onClick={() => handleInputChange('outcome', formData.outcome === outcome ? '' : outcome)}
                    className={`flex items-center justify-center gap-1 px-3 py-2.5 sm:py-2 border rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      formData.outcome === outcome
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className={`${getOutcomeIcon(outcome)} text-sm`}></i>
                    {outcome}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                  className="sr-only"
                />
                <div className={`flex items-center gap-3 px-4 py-3 border rounded-xl transition-all cursor-pointer ${
                  formData.isPublished 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 bg-gray-50'
                }`}>
                  <i className={`${formData.isPublished ? 'ri-checkbox-line text-green-600' : 'ri-checkbox-blank-line text-gray-400'} text-lg flex-shrink-0`}></i>
                  <div>
                    <p className={`text-sm font-medium ${formData.isPublished ? 'text-green-800' : 'text-gray-600'}`}>
                      すぐに公開する
                    </p>
                    <p className="text-xs text-gray-500">
                      {formData.isPublished ? '記事が即座に公開されます' : '下書きとして保存されます'}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 sm:pt-8 border-t border-gray-200 mt-6 sm:mt-8 gap-4">
          <Link
            href="/profile"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer text-sm sm:text-base order-2 sm:order-1"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            プロフィールに戻る
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base"
            >
              <i className="ri-eye-line mr-2"></i>
              プレビュー
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 sm:px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line mr-2 animate-spin"></i>
                  投稿中...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line mr-2"></i>
                  投稿する
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
