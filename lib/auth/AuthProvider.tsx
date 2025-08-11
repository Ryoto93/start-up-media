'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getProfile } from '@/lib/data/profiles'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    // 初期認証状態を取得
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting initial session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // 認証状態の変化を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // クリーンアップ
    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // プロフィール存在チェックとリダイレクト処理
  useEffect(() => {
    const checkProfile = async () => {
      // userが確定し、loadingがfalseで、userがnullではない場合のみ実行
      if (!loading && user && pathname !== '/account-setup') {
        try {
          const profile = await getProfile()
          // プロフィールが存在しない場合、account-setupページにリダイレクト
          if (!profile) {
            router.push('/account-setup')
          }
        } catch (error) {
          console.error('プロフィールチェックエラー:', error)
          // エラーが発生した場合も、安全のためaccount-setupページにリダイレクト
          router.push('/account-setup')
        }
      }
    }

    checkProfile()
  }, [user, loading, pathname, router])

  const value = {
    user,
    loading
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