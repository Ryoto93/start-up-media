'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

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
      async (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // クリーンアップ
    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // プロフィール存在チェックとリダイレクト処理（クライアントサイドのSupabaseで実行）
  useEffect(() => {
    const checkProfile = async () => {
      if (!loading && user && pathname !== '/account-setup') {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .maybeSingle()
          if (error) {
            // 存在しない場合はerrorがnullでdataがnullになることもあるため、両方をチェック
            console.warn('プロフィール取得時の警告:', error.message)
          }
          if (!data) {
            router.push('/account-setup')
          }
        } catch (error) {
          console.error('プロフィールチェックエラー:', error)
          router.push('/account-setup')
        }
      }
    }

    checkProfile()
  }, [user, loading, pathname, router, supabase])

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