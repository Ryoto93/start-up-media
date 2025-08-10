
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-['Pacifico'] text-orange-500">logo</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
              ホーム
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors">
              記事一覧
            </Link>
            <Link href="/login" className="text-orange-600 hover:text-orange-700 px-3 py-2 text-sm font-medium border border-orange-300 rounded-full hover:bg-orange-50 transition-colors whitespace-nowrap cursor-pointer flex items-center">
              <i className="ri-login-box-line mr-1.5"></i>
              ログイン
            </Link>
            <Link href="/profile" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 text-sm font-medium rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm whitespace-nowrap cursor-pointer flex items-center">
              <i className="ri-user-line mr-1.5"></i>
              マイプロフィール
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-3 pt-3 pb-4 space-y-1">
            <Link href="/" className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors">
              ホーム
            </Link>
            <Link href="/articles" className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors">
              記事一覧
            </Link>
            <Link href="/login" className="mx-4 my-2 text-orange-600 border border-orange-300 px-4 py-3 text-base font-medium rounded-lg hover:bg-orange-50 transition-colors block text-center whitespace-nowrap cursor-pointer">
              <i className="ri-login-box-line mr-2"></i>
              ログイン
            </Link>
            <Link href="/profile" className="mx-4 my-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 text-base font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm block text-center whitespace-nowrap cursor-pointer">
              <i className="ri-user-line mr-2"></i>
              マイプロフィール
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
