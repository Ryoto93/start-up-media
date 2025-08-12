'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Profile } from '@/lib/data/profiles';

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    username: profile.username || '',
    website: profile.website || ''
  });

  const displayName = profile.full_name ?? '未設定の名前';
  const username = profile.username;
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
        website: profile.website || ''
      });
    }
    setIsEditing(!isEditing);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append('full_name', formData.full_name);
      formDataObj.append('username', formData.username);
      formDataObj.append('website', formData.website);

      // Server Actionを呼び出す
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        body: formDataObj,
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setIsEditing(false);
        // プロフィール情報を更新（親コンポーネントの再レンダリングを待つ）
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('プロフィール更新エラー:', error);
      setMessage({ type: 'error', text: 'プロフィールの更新に失敗しました。' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8 mb-6 sm:mb-8">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex-shrink-0 self-center sm:self-start">
            <div className="relative">
              <img
                src={avatarUrl}
                alt="プロフィール画像"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-orange-100"
              />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="ウェブサイト (オプション)"
                      className="text-sm sm:text-base text-gray-500 border-b border-gray-200 focus:border-orange-500 outline-none bg-transparent w-full text-center sm:text-left px-2 py-1"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{displayName}</h1>
                    {username && (
                      <p className="text-sm sm:text-base text-gray-500">@{username}</p>
                    )}
                    {profile.website && (
                      <p className="text-sm sm:text-base text-gray-500 mt-1">
                        <a 
                          href={profile.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:text-orange-700"
                        >
                          {profile.website}
                        </a>
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* メッセージ表示 */}
              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                {isEditing ? (
                  <>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 border border-orange-500 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <i className="ri-save-line mr-2"></i>
                      {isSubmitting ? '保存中...' : '保存'}
                    </button>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      disabled={isSubmitting}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
