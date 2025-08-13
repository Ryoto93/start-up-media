'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Profile } from '@/lib/data/profiles';
import { useFormState } from 'react-dom';
import Image from 'next/image';

interface ProfileStatsProps {
  articleCount: number;
  totalLikes: number;
  daysSinceEntrepreneurship: number | null;
  daysSinceConsideration: number | null;
}

interface ProfileHeaderProps {
  profile: Profile;
  serverAction?: (_prevState: { success: boolean; message: string }, formData: FormData) => Promise<{ success: boolean; message: string }>
  stats?: ProfileStatsProps;
}

export default function ProfileHeader({ profile, serverAction, stats }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    username: profile.username || '',
    career: profile.career || '',
    bio: profile.bio || '',
    consideration_start_date: profile.consideration_start_date || '',
    entrepreneurship_start_date: profile.entrepreneurship_start_date || ''
  });

  // Server Action state handling (when provided)
  const [saState, saAction] = useFormState(
    serverAction ?? (async () => ({ success: false, message: '' })),
    { success: false, message: '' }
  );

  // 成功時は編集モードを閉じて再読み込み（自動送信ではなく、送信後のUX）
  useEffect(() => {
    if (!hasSubmitted) return;
    if (saState.success) {
      setIsEditing(false);
      // 反映のためにリロード（Server Components再評価）
      const t = setTimeout(() => window.location.reload(), 300);
      return () => clearTimeout(t);
    }
  }, [hasSubmitted, saState.success]);

  const username = profile.username ?? '';
  const displayName = username || '未設定のユーザー名';
  const avatarUrl = profile.avatar_url ?? 'https://placehold.co/128x128/png?text=Avatar';

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // 編集をキャンセルする場合、元の値に戻す
      setFormData({
        full_name: profile.full_name || '',
        username: profile.username || '',
        career: profile.career || '',
        bio: profile.bio || '',
        consideration_start_date: profile.consideration_start_date || '',
        entrepreneurship_start_date: profile.entrepreneurship_start_date || ''
      });
      setSelectedFile(null);
    }
    setHasSubmitted(false);
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8 mb-6 sm:mb-8">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-shrink-0 self-center sm:self-start">
            <div className="relative">
              <Image
                src={selectedFile ? URL.createObjectURL(selectedFile) : avatarUrl}
                alt="プロフィール画像"
                width={128}
                height={128}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-orange-100"
                unoptimized={selectedFile ? true : false}
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-40 transition-all"
                     onClick={() => document.getElementById('profile-image-input')?.click()}>
                  <i className="ri-camera-line text-white text-2xl"></i>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            {/* 上段: 名前・ユーザー名・統計 */}
            {!isEditing && (
              <div className="mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{displayName}</h1>
                {username && (
                  <p className="text-sm sm:text-base text-gray-500">@{username}</p>
                )}

                {/* 統計表示 */}
                {stats && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center sm:text-left">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs text-blue-600">記事数</p>
                      <p className="text-lg font-semibold text-blue-800">{stats.articleCount ?? 0}</p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                      <p className="text-xs text-green-600">総いいね</p>
                      <p className="text-lg font-semibold text-green-800">{stats.totalLikes ?? 0}</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                      <p className="text-xs text-emerald-600">起業から</p>
                      <p className="text-lg font-semibold text-emerald-800">{stats.daysSinceEntrepreneurship ?? 0}日</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
                      <p className="text-xs text-orange-600">検討開始から</p>
                      <p className="text-lg font-semibold text-orange-800">{stats.daysSinceConsideration ?? 0}日</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <form
              key={isEditing ? 'editing' : 'view'}
              action={serverAction && isEditing ? saAction : undefined}
              method={serverAction && isEditing ? 'post' : undefined}
              className="space-y-4 sm:space-y-6"
            >
              <div className="mb-4 sm:mb-6">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      placeholder="フルネーム"
                      className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 border-b-2 border-orange-200 focus:border-orange-500 outline-none bg-transparent text-center sm:text-left w-full px-2 py-1"
                      required
                    />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="ユーザー名"
                      className="text-sm sm:text-base text-gray-500 border-b border-gray-200 focus:border-orange-500 outline-none bg-transparent w-full text-center sm:text-left px-2 py-1"
                      required
                    />

                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="自己紹介"
                      className="text-sm sm:text-base text-gray-700 border border-gray-200 focus:border-orange-500 outline-none bg-transparent w-full text-left px-3 py-2 rounded-lg"
                      rows={4}
                    />
                    <input
                      type="text"
                      name="career"
                      value={formData.career}
                      onChange={(e) => handleInputChange('career', e.target.value)}
                      placeholder="経歴（例：〇〇株式会社／エンジニア）"
                      className="text-sm sm:text-base text-gray-700 border-b border-gray-200 focus:border-orange-500 outline-none bg-transparent w-full text-left px-2 py-1"
                    />
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">プロフィール画像</label>
                        <input
                          id="profile-image-input"
                          type="file"
                          name="profile_image"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0] || null;
                            setSelectedFile(file);
                          }}
                          className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-orange-50 file:px-3 file:py-2 file:text-orange-700 hover:file:bg-orange-100"
                        />
                        <p className="mt-1 text-xs text-gray-500">JPEG、PNG、WebP形式、5MB以下のファイルを選択してください。</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">起業検討開始日</label>
                          <input
                            type="date"
                            name="consideration_start_date"
                            value={formData.consideration_start_date}
                            onChange={(e) => handleInputChange('consideration_start_date', e.target.value)}
                            className="w-full text-sm text-gray-700 border border-gray-200 focus:border-orange-500 outline-none bg-transparent px-3 py-2 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">起業開始日</label>
                          <input
                            type="date"
                            name="entrepreneurship_start_date"
                            value={formData.entrepreneurship_start_date}
                            onChange={(e) => handleInputChange('entrepreneurship_start_date', e.target.value)}
                            className="w-full text-sm text-gray-700 border border-gray-200 focus:border-orange-500 outline-none bg-transparent px-3 py-2 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{displayName}</h1>
                    {username && (
                      <p className="text-sm sm:text-base text-gray-500">@{username}</p>
                    )}

                    {/* 追加のプロフィール情報を表示（保存内容の可視化） */}
                    {(profile.bio || profile.career || profile.consideration_start_date || profile.entrepreneurship_start_date) && (
                      <div className="mt-4 space-y-3 text-left">
                        {profile.bio && (
                          <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
                        )}
                        {profile.career && (
                          <p className="text-sm text-gray-600"><i className="ri-briefcase-line mr-2"></i>{profile.career}</p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {profile.consideration_start_date && (
                            <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                              <i className="ri-calendar-line mr-2"></i>
                              <span>起業検討開始日: {new Date(profile.consideration_start_date).toLocaleDateString('ja-JP')}</span>
                            </div>
                          )}
                          {profile.entrepreneurship_start_date && (
                            <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                              <i className="ri-rocket-line mr-2"></i>
                              <span>起業開始日: {new Date(profile.entrepreneurship_start_date).toLocaleDateString('ja-JP')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* サーバーからのメッセージ表示（ユーザー送信後のみ） */}
              {hasSubmitted && saState.message && (
                <div className={`p-3 rounded-lg text-sm ${
                  saState.success 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {saState.message}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                {isEditing ? (
                  <>
                    <button
                      type="submit"
                      onClick={() => setHasSubmitted(true)}
                      className="px-4 py-2 border border-orange-500 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base"
                    >
                      <i className="ri-save-line mr-2"></i>
                      保存
                    </button>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base"
                    >
                      キャンセル
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base flex items-center justify-center"
                    >
                      <i className="ri-edit-line mr-2"></i>
                      プロフィール編集
                    </button>
                    <Link
                      href="/create-article"
                      className="px-4 sm:px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center text-sm sm:text-base"
                    >
                      <i className="ri-add-line mr-2"></i>
                      記事を投稿する
                    </Link>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
