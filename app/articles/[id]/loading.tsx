export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Content Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 p-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-6">
              <div className="flex-1">
                <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-32 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Author Profile Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex space-x-4">
                <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Related Articles Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}