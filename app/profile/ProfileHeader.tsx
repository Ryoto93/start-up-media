
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '田中 健太',
    age: 32,
    career: '元Google Japan マーケティングマネージャー',
    bio: 'Google Japanでマーケティングマネージャーとして5年間勤務後、2022年にAIスタートアップを創業しました。大企業での経験を活かしながら、スタートアップの世界で日々学びと挑戦を続けています。特にB2Bサービスのグロースハックと組織作りに兴味があり、同じような境遇の起業家の方々と情報交換できればと思います。',
    entrepreneurshipConsiderationStartDate: '2022-06-01',
    entrepreneurshipStartDate: '2023-03-15'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ 
      ...prev,
      [field]: value
    }));
  };

  const calculateDaysDifference = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysFromConsiderationStart = profileData.entrepreneurshipConsiderationStartDate 
    ? calculateDaysDifference(profileData.entrepreneurshipConsiderationStartDate)
    : 0;

  const daysFromEntrepreneurshipStart = profileData.entrepreneurshipStartDate 
    ? calculateDaysDifference(profileData.entrepreneurshipStartDate)
    : 0;

  const considerationPeriodDays = (profileData.entrepreneurshipConsiderationStartDate && profileData.entrepreneurshipStartDate)
    ? calculateDaysDifference(profileData.entrepreneurshipConsiderationStartDate, profileData.entrepreneurshipStartDate)
    : 0;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8 mb-6 sm:mb-8">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-shrink-0 self-center sm:self-start">
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20business%20person%20headshot%2C%20corporate%20portrait%2C%20confident%20smile%2C%20modern%20office%20background%2C%20clean%20and%20professional%20lighting%2C%20high%20quality%20photography&width=200&height=200&seq=profile001&orientation=squarish"
                alt="プロフィール画像"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-orange-100"
              />
              <button className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors cursor-pointer">
                <i className="ri-camera-line text-xs sm:text-sm"></i>
              </button>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="mb-4 sm:mb-6">
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 border-b-2 border-orange-200 focus:border-orange-500 outline-none bg-transparent text-center sm:text-left w-full"
                />
              ) : (
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
              )}
              {isEditing ? (
                <input
                  type="number"
                  value={profileData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="text-lg text-gray-600 mb-1 border-b border-gray-200 focus:border-orange-500 outline-none bg-transparent w-20 text-center sm:text-left"
                />
              ) : (
                <p className="text-lg text-gray-600 mb-1">{profileData.age}歳</p>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.career}
                  onChange={(e) => handleInputChange('career', e.target.value)}
                  className="text-sm sm:text-base text-gray-500 border-b border-gray-200 focus:border-orange-500 outline-none bg-transparent w-full text-center sm:text-left"
                />
              ) : (
                <p className="text-sm sm:text-base text-gray-500">{profileData.career}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 border rounded-full transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base ${ 
                  isEditing 
                    ? 'border-orange-500 bg-orange-500 text-white hover:bg-orange-600' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className={`${isEditing ? 'ri-save-line' : 'ri-edit-line'} mr-2`}></i>
                {isEditing ? '保存' : 'プロフィール編集'}
              </button>
              <Link
                href="/create-article"
                className="px-4 sm:px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center text-sm sm:text-base"
              >
                <i className="ri-add-line mr-2"></i>
                記事を投稿する
              </Link>
            </div>
          </div>
        </div>

        {/* 起業日程セクション */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">起業ジャーニー</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                起業検討開始日
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.entrepreneurshipConsiderationStartDate}
                  onChange={(e) => handleInputChange('entrepreneurshipConsiderationStartDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
                />
              ) : (
                <p className="text-gray-900 font-medium text-sm">
                  {new Date(profileData.entrepreneurshipConsiderationStartDate).toLocaleDateString('ja-JP')}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                起業開始日
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.entrepreneurshipStartDate}
                  onChange={(e) => handleInputChange('entrepreneurshipStartDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
                />
              ) : (
                <p className="text-gray-900 font-medium text-sm">
                  {new Date(profileData.entrepreneurshipStartDate).toLocaleDateString('ja-JP')}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">自己紹介</h3>
          {isEditing ? (
            <textarea
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none text-sm"
              maxLength={500}
            />
          ) : (
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {profileData.bio}
            </p>
          )}
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-blue-50 px-3 sm:px-4 py-3 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
              <i className="ri-article-line text-blue-600 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
              <span className="text-blue-700 text-xs sm:text-sm font-medium">投稿記事数</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-blue-800">8記事</p>
          </div>

          <div className="bg-green-50 px-3 sm:px-4 py-3 rounded-xl border border-green-100">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
              <i className="ri-heart-line text-green-600 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
              <span className="text-green-700 text-xs sm:text-sm font-medium">総いいね数</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-green-800">234</p>
          </div>

          <div className="bg-purple-50 px-3 sm:px-4 py-3 rounded-xl border border-purple-100">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
              <i className="ri-user-follow-line text-purple-600 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
              <span className="text-purple-700 text-xs sm:text-sm font-medium">フォロワー</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-purple-800">45人</p>
          </div>

          <div className="bg-orange-50 px-3 sm:px-4 py-3 rounded-xl border border-orange-100">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
              <i className="ri-lightbulb-line text-orange-600 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
              <span className="text-orange-700 text-xs sm:text-sm font-medium">起業検討開始から</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-orange-800" suppressHydrationWarning={true}>
              {daysFromConsiderationStart}日
            </p>
          </div>

          <div className="bg-emerald-50 px-3 sm:px-4 py-3 rounded-xl border border-emerald-100">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
              <i className="ri-rocket-line text-emerald-600 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
              <span className="text-emerald-700 text-xs sm:text-sm font-medium">起業から</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-emerald-800" suppressHydrationWarning={true}>
              {daysFromEntrepreneurshipStart}日
            </p>
          </div>

          <div className="bg-amber-50 px-3 sm:px-4 py-3 rounded-xl border border-amber-100">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
              <i className="ri-time-line text-amber-600 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
              <span className="text-amber-700 text-xs sm:text-sm font-medium">起業検討期間</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-amber-800">
              {considerationPeriodDays}日
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
