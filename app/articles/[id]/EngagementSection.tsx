'use client';

import { useState } from 'react';

interface EngagementSectionProps {
  articleId: string;
  initialLikes: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  avatar: string;
}

export default function EngagementSection({ articleId, initialLikes }: EngagementSectionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'あなた',
        content: newComment.trim(),
        date: new Date().toLocaleDateString('ja-JP'),
        likes: 0,
        avatar: 'https://readdy.ai/api/search-image?query=Default%20user%20avatar%20with%20friendly%20smile%2C%20professional%20headshot%20style%2C%20clean%20white%20background%20with%20warm%20lighting%2C%20approachable%20person%20portrait&width=40&height=40&seq=defaultuser&orientation=squarish'
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-gray-900">この記事への反応</h3>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all transform hover:scale-105 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <i className={`w-5 h-5 flex items-center justify-center ${isLiked ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
            <span className="font-medium whitespace-nowrap">{likeCount}</span>
          </button>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <i className="ri-chat-1-line w-5 h-5 flex items-center justify-center"></i>
            <span className="font-medium">{comments.length}</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">コメントを投稿</h4>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="この記事について感想やご質問をお聞かせください..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none h-24"
            maxLength={500}
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {newComment.length}/500文字
            </span>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              コメントを投稿
            </button>
          </div>
        </form>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-6">
          コメント ({comments.length})
        </h4>
        
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <i className="ri-chat-1-line text-gray-300 text-4xl mb-4 w-12 h-12 flex items-center justify-center mx-auto"></i>
            <p className="text-gray-500">まだコメントがありません</p>
            <p className="text-gray-400 text-sm">最初のコメントを投稿してみませんか？</p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedComments.map((comment) => (
              <div key={comment.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={comment.avatar} 
                  alt={comment.author}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h5 className="font-medium text-gray-900">{comment.author}</h5>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors">
                      <i className="ri-heart-line w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-sm">{comment.likes}</span>
                    </button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))}
            
            {comments.length > 3 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="px-6 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors whitespace-nowrap"
                >
                  {showAllComments ? 'コメントを折りたたむ' : `他${comments.length - 3}件のコメントを表示`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const initialComments: Comment[] = [
  {
    id: '1',
    author: '起業検討中の山田',
    content: 'とても参考になりました！特に顧客との直接対話の重要性について、改めて考えさせられました。私も製造業出身なので、同じような思い込みを持っていたかもしれません。',
    date: '2024-01-16',
    likes: 12,
    avatar: 'https://readdy.ai/api/search-image?query=Young%20Japanese%20businessman%20with%20thoughtful%20expression%2C%20professional%20headshot%20style%2C%20clean%20background%20with%20warm%20lighting%2C%20startup%20entrepreneur%20portrait&width=40&height=40&seq=commenter1&orientation=squarish'
  },
  {
    id: '2',
    author: '食品業界の佐藤',
    content: '食品業界での起業は本当に大変ですよね。地域密着型のアプローチは正解だと思います。私たちも似たような課題に直面しているので、とても共感できます。',
    date: '2024-01-17',
    likes: 8,
    avatar: 'https://readdy.ai/api/search-image?query=Middle-aged%20Japanese%20businesswoman%20with%20friendly%20smile%2C%20professional%20headshot%20style%2C%20clean%20background%20with%20soft%20lighting%2C%20food%20industry%20professional%20portrait&width=40&height=40&seq=commenter2&orientation=squarish'
  },
  {
    id: '3',
    author: 'マーケティング担当者',
    content: '失敗から学んだマーケティング手法、具体的で実践的ですね。小ロット・高頻度での仮説検証は、どの業界でも応用できそうです。続報も楽しみにしています！',
    date: '2024-01-18',
    likes: 15,
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20marketing%20specialist%20with%20confident%20expression%2C%20modern%20business%20headshot%2C%20clean%20white%20background%20with%20professional%20lighting&width=40&height=40&seq=commenter3&orientation=squarish'
  },
  {
    id: '4',
    author: 'トヨタOBの鈴木',
    content: '同じトヨタ出身として、とても興味深く読ませていただきました。製造業で培った品質へのこだわりを、どう食品業界で活かしていくのか、今後の展開が楽しみです。',
    date: '2024-01-19',
    likes: 6,
    avatar: 'https://readdy.ai/api/search-image?query=Senior%20Japanese%20businessman%20with%20wise%20expression%2C%20professional%20corporate%20headshot%20style%2C%20clean%20background%20with%20warm%20professional%20lighting&width=40&height=40&seq=commenter4&orientation=squarish'
  }
];