"use server"

import { createServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

interface CreateProfileData {
  username: string
  full_name: string
  age?: number | null
  bio?: string | null
  avatar_url?: string | null
  entrepreneurship_start_date?: string | null
  consideration_start_date: string
}

function isFormData(input: unknown): input is FormData {
  return typeof FormData !== 'undefined' && input instanceof FormData
}

function normalizeInput(input: FormData | CreateProfileData): CreateProfileData {
  if (isFormData(input)) {
    const username = String(input.get('username') ?? '').trim()
    const full_name = String(input.get('full_name') ?? '').trim()
    const rawAge = String(input.get('age') ?? '').trim()
    const ageNum = rawAge ? Number(rawAge) : NaN
    const age = Number.isFinite(ageNum) ? ageNum : null
    const bio = (input.get('bio') ? String(input.get('bio')).trim() : '') || null
    const avatar_url = (input.get('avatar_url') ? String(input.get('avatar_url')).trim() : '') || null
    const entrepreneurship_start_date = (input.get('entrepreneurship_start_date') ? String(input.get('entrepreneurship_start_date')).trim() : '') || null
    const consideration_start_date = String(input.get('consideration_start_date') ?? '').trim()
    return { username, full_name, age, bio, avatar_url, entrepreneurship_start_date, consideration_start_date }
  }
  return input
}

/**
 * ユーザープロフィールを作成/更新するServer Action
 * - 認証ユーザーの id を必ず含めて書き込み（RLSに準拠）
 * - 既存行がある場合は upsert で更新
 */
export async function createProfile(data: FormData | CreateProfileData) {
  const {
    username,
    full_name,
    age = null,
    bio = null,
    avatar_url = null,
    entrepreneurship_start_date = null,
    consideration_start_date,
  } = normalizeInput(data)

  if (!username || !full_name) throw new Error('ユーザー名とフルネームは必須です。')
  if (!consideration_start_date) throw new Error('起業検討開始日は必須です。')

  try {
    const supabase = createServer()

    // 認証ユーザー取得
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error('ユーザー認証エラー:', userError.message)
      throw new Error('認証に失敗しました。再度ログインしてください。')
    }
    if (!user) {
      throw new Error('ログインしていません。')
    }

    // RLS対応: id は auth.uid() と一致させる
    const nowIso = new Date().toISOString()
    const { error: upsertError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          username,
          full_name,
          age,
          bio,
          avatar_url,
          entrepreneurship_start_date,
          consideration_start_date,
          created_at: nowIso,
          updated_at: nowIso,
        },
        { onConflict: 'id' }
      )

    if (upsertError) {
      // 一意制約などをユーザに分かるメッセージへ変換
      const msg = upsertError.message || ''
      if (/duplicate key|unique/i.test(msg) && /username/i.test(msg)) {
        throw new Error('そのユーザー名は既に使用されています。別のユーザー名をお試しください。')
      }
      console.error('プロフィール作成/更新エラー:', upsertError)
      throw new Error('プロフィールの作成に失敗しました。時間をおいて再度お試しください。')
    }
  } catch (error) {
    console.error('プロフィール作成中の予期しないエラー:', error)
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('プロフィールの作成に失敗しました。')
    }
  }

  // 成功時はプロフィールページにリダイレクト（try/catchの外で実行し、NEXT_REDIRECTを捕捉しない）
  redirect('/profile')
} 