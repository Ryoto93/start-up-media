
'use client';

import Header from '../../components/Header';
import ProfileHeader from './ProfileHeader';
import TimelineSection from './TimelineSection';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ProfileHeader />
        <TimelineSection />
      </main>
    </div>
  );
}
