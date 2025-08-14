import Header from '../../components/Header'
import ProfileHeader from './ProfileHeader'
import TimelineSection from './TimelineSection'
import { getProfileWithStats, updateProfileWithState } from '@/lib/data/profiles'
import { redirect } from 'next/navigation'
import { getArticlesByAuthorId } from '@/lib/data/articles'

export const dynamic = 'force-dynamic'

function diffDaysLocal(fromIso: string | null): number | null {
  if (!fromIso) return null
  // Normalize both dates to local start-of-day to avoid timezone drift
  const fromDate = new Date(fromIso)
  const fromStart = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
  const now = new Date()
  const nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const ms = nowStart.getTime() - fromStart.getTime()
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)))
}

export default async function ProfilePage() {
  const result = await getProfileWithStats()

  if (!result) {
    redirect('/account-setup')
  }

  const { profile, articleCount, totalLikes } = result

  const daysSinceEntrepreneurship = diffDaysLocal(profile.entrepreneurship_start_date)
  const daysSinceConsideration = diffDaysLocal(profile.consideration_start_date)

  // Fetch authored articles for timeline
  const authoredArticles = await getArticlesByAuthorId(profile.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <ProfileHeader
          profile={profile}
          serverAction={updateProfileWithState}
          stats={{
            articleCount,
            totalLikes,
            daysSinceEntrepreneurship,
            daysSinceConsideration,
          }}
        />
        <TimelineSection userId={profile.id} articles={authoredArticles} />
      </main>
    </div>
  )
}
export const revalidate = 0;
