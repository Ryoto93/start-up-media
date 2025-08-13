export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Skeleton */}
            <div className="space-y-8 lg:pr-8">
              <div className="w-64 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              
              <div className="space-y-4">
                <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-4/5 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="text-center">
                    <div className="h-10 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-1"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-14 w-48 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="h-14 w-44 bg-gray-200 rounded-2xl animate-pulse"></div>
              </div>
            </div>

            {/* Right Visual Skeleton */}
            <div className="relative lg:pl-8">
              <div className="relative">
                <div className="w-full h-[500px] bg-gray-200 rounded-3xl animate-pulse"></div>
                
                {/* Floating Cards Skeleton */}
                <div className="absolute -top-6 -left-6 w-24 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="absolute top-20 -right-8 w-20 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {[1, 2, 3].map(section => (
          <section key={section} className="mb-12 sm:mb-16">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-50 via-orange-100 to-amber-50 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>

                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse mb-4"></div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section Skeleton */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 w-80 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
          <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mx-auto mb-8"></div>
          <div className="h-12 w-40 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
        </div>
      </section>
    </div>
  );
}