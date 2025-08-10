'use client';

import { useState } from 'react';

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  phase: string;
  outcome: string;
  categories: string[];
  searchKeyword: string;
  sortBy: string;
}

export default function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterState>({
    phase: '',
    outcome: '',
    categories: [],
    searchKeyword: '',
    sortBy: 'newest'
  });

  const [showPhaseDropdown, setShowPhaseDropdown] = useState(false);
  const [showOutcomeDropdown, setShowOutcomeDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const phases = ['起業検討期', '直前・直後', '開始期', '成長期'];
  const outcomes = ['成功体験', '失敗体験', 'その他'];
  const categories = ['営業', 'マーケティング', '事業計画', '経理', '開発', '雑務'];
  const sortOptions = [
    { value: 'newest', label: '新着順' },
    { value: 'popular', label: '人気順' },
    { value: 'date', label: '出来事日付順' }
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      phase: '',
      outcome: '',
      categories: [],
      searchKeyword: '',
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.phase) count++;
    if (filters.outcome) count++;
    if (filters.categories.length > 0) count++;
    if (filters.searchKeyword) count++;
    return count;
  };

  const removeFilter = (type: string, value?: string) => {
    if (type === 'phase') updateFilters({ phase: '' });
    if (type === 'outcome') updateFilters({ outcome: '' });
    if (type === 'category' && value) {
      updateFilters({ categories: filters.categories.filter(c => c !== value) });
    }
    if (type === 'search') updateFilters({ searchKeyword: '' });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 検索バー */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">記事を検索</label>
        <div className="relative">
          <input
            type="text"
            value={filters.searchKeyword}
            onChange={(e) => updateFilters({ searchKeyword: e.target.value })}
            placeholder="キーワードを入力..."
            className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
          {filters.searchKeyword && (
            <button
              onClick={() => updateFilters({ searchKeyword: '' })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center cursor-pointer"
            >
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>
      </div>

      {/* フィルターセクション */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-sm font-semibold text-gray-700">フィルター</h3>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearFilters}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium cursor-pointer whitespace-nowrap flex items-center"
            >
              <i className="ri-refresh-line mr-1 w-4 h-4 flex items-center justify-center"></i>
              クリア
            </button>
          )}
        </div>

        <div className="space-y-4 sm:space-y-5">
          {/* フェーズフィルター */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">起業フェーズ</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {phases.map(phase => (
                <button
                  key={phase}
                  onClick={() => updateFilters({ phase: filters.phase === phase ? '' : phase })}
                  className={`px-3 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap text-center ${
                    filters.phase === phase
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>
          </div>

          {/* 成果軸フィルター */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">体験の種類</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {outcomes.map(outcome => (
                <button
                  key={outcome}
                  onClick={() => updateFilters({ outcome: filters.outcome === outcome ? '' : outcome })}
                  className={`px-3 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap text-center ${
                    filters.outcome === outcome
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {outcome}
                </button>
              ))}
            </div>
          </div>

          {/* 領域フィルター */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">事業領域</label>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap text-center ${
                    filters.categories.includes(category)
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ソートセクション */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-4">並び順</label>
        <div className="space-y-2">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => updateFilters({ sortBy: option.value })}
              className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer text-left flex items-center ${
                filters.sortBy === option.value
                  ? 'bg-orange-50 text-orange-700 border-2 border-orange-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <i
                className={`mr-3 w-4 h-4 flex items-center justify-center ${
                  filters.sortBy === option.value ? 'ri-radio-button-fill text-orange-500' : 'ri-radio-button-line text-gray-400'
                }`}
              ></i>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* アクティブフィルター表示 */}
      {getActiveFilterCount() > 0 && (
        <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-orange-800">適用中のフィルター</span>
            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              {getActiveFilterCount()}件
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.phase && (
              <span className="inline-flex items-center bg-white text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-200">
                {filters.phase}
                <button
                  onClick={() => removeFilter('phase')}
                  className="ml-2 text-orange-500 hover:text-orange-700 cursor-pointer"
                >
                  <i className="ri-close-line w-3 h-3 flex items-center justify-center"></i>
                </button>
              </span>
            )}
            {filters.outcome && (
              <span className="inline-flex items-center bg-white text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-200">
                {filters.outcome}
                <button
                  onClick={() => removeFilter('outcome')}
                  className="ml-2 text-orange-500 hover:text-orange-700 cursor-pointer"
                >
                  <i className="ri-close-line w-3 h-3 flex items-center justify-center"></i>
                </button>
              </span>
            )}
            {filters.categories.map(category => (
              <span
                key={category}
                className="inline-flex items-center bg-white text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-200"
              >
                {category}
                <button
                  onClick={() => removeFilter('category', category)}
                  className="ml-2 text-orange-500 hover:text-orange-700 cursor-pointer"
                >
                  <i className="ri-close-line w-3 h-3 flex items-center justify-center"></i>
                </button>
              </span>
            ))}
            {filters.searchKeyword && (
              <span className="inline-flex items-center bg-white text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-200">
                「{filters.searchKeyword}」
                <button
                  onClick={() => removeFilter('search')}
                  className="ml-2 text-orange-500 hover:text-orange-700 cursor-pointer"
                >
                  <i className="ri-close-line w-3 h-3 flex items-center justify-center"></i>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
