'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/data/profiles'

interface AuthContextType {
  user: User | null
  loading: boolean
  profile: Profile | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  // サーバー側プロフィール取得（API経由）
  const fetchServerProfile = async (): Promise<Profile | null> => {
    try {
      const res = await fetch('/api/profile/get', { method: 'GET', cache: 'no-store' })
      if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status}`)
      }
      const json = await res.json() as { success: boolean; profile: Profile | null }
      return json.profile ?? null
    } catch (e) {
      console.error('fetchServerProfile error:', e)
      return null
    }
  }

  useEffect(() => {
    // 初期認証状態を取得
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)

        if (session?.user) {
          const serverProfile = await fetchServerProfile()
          setProfile(serverProfile)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        setUser(null)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // 認証状態の変化を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          setUser(session?.user ?? null)

          if (session?.user) {
            const serverProfile = await fetchServerProfile()
            setProfile(serverProfile)
          } else {
            setProfile(null)
          }
        } catch (e) {
          console.error('onAuthStateChange handler error:', e)
          setProfile(null)
        } finally {
          setLoading(false)
        }
      }
    )

    // クリーンアップ
    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // リダイレクトロジックの最適化
  useEffect(() => {
    // ローディングが完了し、ユーザーは存在するがプロフィールが存在しない場合のみリダイレクト
    // サーバー側で制御する /profile ではクライアント側リダイレクトをしない
    if (!loading && user && !profile && pathname !== '/account-setup' && pathname !== '/profile') {
      router.push('/account-setup')
    }
  }, [user, loading, profile, pathname, router])

  const value = {
    user,
    loading,
    profile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 