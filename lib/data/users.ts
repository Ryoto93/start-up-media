"use server"

import { createServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { uploadImage } from './storage'

interface CreateProfileData {
  username: string
  age?: number | null
  bio?: string | null
  entrepreneurship_start_date?: string | null
  consideration_start_date: string
  avatar_url?: string | null
}

function isFormData(input: unknown): input is FormData {
  return typeof FormData !== 'undefined' && input instanceof FormData
}

function normalizeInput(input: FormData | CreateProfileData): CreateProfileData {
  if (isFormData(input)) {
    const username = String(input.get('username') ?? '').trim()
    const rawAge = String(input.get('age') ?? '').trim()
    const ageParsed = rawAge !== '' ? parseInt(rawAge, 10) : NaN
    const age = Number.isFinite(ageParsed) ? ageParsed : null
    const bio = (input.get('bio') ? String(input.get('bio')).trim() : '') || null
    const entrepreneurship_start_date = (input.get('entrepreneurship_start_date') ? String(input.get('entrepreneurship_start_date')).trim() : '') || null
    const consideration_start_date = String(input.get('consideration_start_date') ?? '').trim()
    return { username, age, bio, entrepreneurship_start_date, consideration_start_date }
  }
  return input
}

/**
 * ユーザープロフィールを作成/更新するServer Action
 * - 認証ユーザーの id を必ず含めて書き込み（RLSに準拠）
 * - プロフィール画像のアップロード処理を含む
 */
export async function createProfile(formData: FormData) {
  const {
    username,
    age = null,
    bio = null,
    entrepreneurship_start_date = null,
    consideration_start_date,
  } = normalizeInput(formData)

  if (!username) throw new Error('ユーザー名は必須です。')
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

    // プロフィール画像のアップロード処理
    let avatar_url: string | null = null
    const profileImageFile = formData.get('profile_image') as File | null
    
    if (profileImageFile && profileImageFile.size > 0) {
      const uploadResult = await uploadImage('avatars', profileImageFile)
      if (uploadResult.success && uploadResult.publicUrl) {
        avatar_url = uploadResult.publicUrl
      } else {
        throw new Error(uploadResult.message || 'プロフィール画像のアップロードに失敗しました。')
      }
    }

    // RLS対応: id は auth.uid() と一致させる
    const nowIso = new Date().toISOString()
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        username,
        age,
        bio,
        entrepreneurship_start_date,
        consideration_start_date,
        avatar_url,
        created_at: nowIso,
        updated_at: nowIso,
      })

    if (insertError) {
      const msg = insertError.message || ''
      if (/duplicate key|unique/i.test(msg) && /username/i.test(msg)) {
        throw new Error('そのユーザー名は既に使用されています。別のユーザー名をお試しください。')
      }
      console.error('プロフィール作成エラー:', insertError)
      throw new Error('プロフィールの作成に失敗しました。')
    }
  } catch (error) {
    console.error('プロフィール作成中の予期しないエラー:', error)
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('プロフィールの作成に失敗しました。')
    }
  }

  revalidatePath('/profile')
  // 成功時はプロフィールページにリダイレクト
  redirect('/profile')
} 