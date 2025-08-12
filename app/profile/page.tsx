import Header from '../../components/Header'
import ProfileHeader from './ProfileHeader'
import TimelineSection from './TimelineSection'
import { getProfile, updateProfileWithState } from '@/lib/data/profiles'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const profile = await getProfile()

  if (!profile) {
    redirect('/account-setup')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ProfileHeader profile={profile} serverAction={updateProfileWithState} />
        <TimelineSection userId={profile.id} />
      </main>
    </div>
  )
}
