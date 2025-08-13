'use client';

import Link from 'next/link';
import Image from 'next/image';

interface AuthorProfileProps {
  author: {
    name: string;
    age: number;
    career: string;
    bio: string;
    avatar: string;
  };
}

export default function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">投稿者について</h3>
      
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <Image 
            src={author.avatar} 
            alt={author.name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border-2 border-orange-200"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-gray-900">{author.name}</h4>
            <span className="text-sm text-gray-500">{author.age}歳</span>
          </div>
          
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">
              {author.career}
            </span>
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {author.bio}
          </p>
          
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors cursor-pointer">
              <i className="ri-user-line w-4 h-4 flex items-center justify-center"></i>
              <span className="text-sm font-medium whitespace-nowrap">プロフィールを見る</span>
            </Link>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
              <i className="ri-user-follow-line w-4 h-4 flex items-center justify-center"></i>
              <span className="text-sm font-medium whitespace-nowrap">フォロー</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
              <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
              <span className="text-sm font-medium whitespace-nowrap">メッセージ</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        {/* 追加の著者統計はDB連携後に表示可能 */}
      </div>
    </div>
  );
}