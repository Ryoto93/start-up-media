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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-32 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Timeline Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-6 pb-8 border-b border-gray-200 last:border-b-0">
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}