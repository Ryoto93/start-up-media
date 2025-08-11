
'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });
    if (error) {
      console.error('Google OAuth sign-in failed:', error.message);
      alert('ログインに失敗しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />
      
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-google-fill text-3xl text-white"></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                ログイン
              </h1>
              <p className="text-gray-600">
                Googleアカウントでログインしてください
              </p>
            </div>

            <div className="space-y-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-6 py-4 bg-white border-2 border-gray-300 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-lg font-medium whitespace-nowrap cursor-pointer group"
              >
                <i className="ri-google-fill mr-4 text-2xl text-red-500 group-hover:scale-110 transition-transform"></i>
                <span className="text-gray-700 group-hover:text-orange-700">Googleでログイン</span>
              </button>

              <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-information-line text-white text-sm"></i>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">安全で簡単なログイン</p>
                    <p>Googleアカウントを使用して安全にログインできます。個人情報は保護されます。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
              <h3 className="font-semibold text-gray-900 mb-3">ログインするとできること</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <i className="ri-edit-line text-orange-500 mr-3"></i>
                  <span>実験記事の投稿・編集</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-user-line text-orange-500 mr-3"></i>
                  <span>プロフィールの管理</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-bookmark-line text-orange-500 mr-3"></i>
                  <span>お気に入り記事の保存</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-chat-3-line text-orange-500 mr-3"></i>
                  <span>コメント・いいね機能</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              ログインすることで、
              <Link href="#" className="text-orange-600 hover:text-orange-700 cursor-pointer">利用規約</Link>
              および
              <Link href="#" className="text-orange-600 hover:text-orange-700 cursor-pointer">プライバシーポリシー</Link>
              に同意したものとみなされます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
