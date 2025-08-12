'use client';

interface TimelineSectionProps {
  userId: string
}

export default function TimelineSection({ userId }: TimelineSectionProps) {
  // TODO: fetch posts for this userId in a future iteration
  const hasPostsForUser = false

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">起業ストーリー タイムライン</h2>

      {!hasPostsForUser && (
        <div className="text-center py-12">
          <i className="ri-file-text-line text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-lg">投稿はまだありません</p>
          <p className="text-gray-400 text-sm mt-2">ユーザーID: {userId}</p>
        </div>
      )}
    </div>
  )
}
