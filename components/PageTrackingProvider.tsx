'use client';

import { usePageTracking } from '@/hooks/usePageTracking';

interface PageTrackingProviderProps {
  children: React.ReactNode;
}

export function PageTrackingProvider({ children }: PageTrackingProviderProps) {
  usePageTracking();
  
  return <>{children}</>;
} 