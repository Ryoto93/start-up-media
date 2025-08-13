import { createServer } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { uploadImage } from './storage';

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  career: string | null;
  bio: string | null;
  consideration_start_date: string | null;
  entrepreneurship_start_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  full_name: string;
  username: string;
  career?: string;
  bio?: string;
  consideration_start_date?: string;
  entrepreneurship_start_date?: string;
}

/**
 * 現在ログインしているユーザーのプロフィール情報を取得
 * @returns プロフィール情報、またはログインしていない場合はnull
 */
export async function getProfile(): Promise<Profile | null> {
  console.log('getProfile called');
  
  try {
    const supabase = createServer();
    console.log('Supabase client created');
    
    // 現在のセッションからユーザーIDを取得（fallback付き）
    let userId: string | null = null;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log('getUser result:', { user: userData?.user, userError });
    if (userError) {
      console.warn('getUser error, trying getSession:', userError.message);
    }

    if (userData?.user?.id) {
      userId = userData.user.id;
    } else {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log('getSession result:', { session: sessionData?.session, sessionError });
      if (sessionData?.session?.user?.id) {
        userId = sessionData.session.user.id;
      }
    }

    if (!userId) {
      console.log('No userId found, returning null');
      return null;
    }
    
    // profilesテーブルからプロフィール情報を取得（スキーマに存在するカラムすべて）
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    console.log('Profile data:', profile);
    console.log('Profile error:', profileError);
    
    if (profileError) {
      console.error('プロフィール取得エラー:', profileError.message);
      return null;
    }
    
    if (!profile) {
      console.log('No profile found, returning null');
      return null;
    }
    
    console.log('Returning profile:', profile);
    return profile as Profile;
    
  } catch (error) {
    console.error('プロフィール取得中の予期しないエラー:', error);
    return null;
  }
}

/**
 * 現在ログイン中ユーザーのプロフィール＋記事集計（記事数・総いいね数）を返す
 */
export async function getProfileWithStats(): Promise<{
  profile: Profile;
  articleCount: number;
  totalLikes: number;
} | null> {
  try {
    const supabase = createServer();

    // ユーザーID取得
    let userId: string | null = null;
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user?.id) {
      userId = userData.user.id;
    } else {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user?.id) {
        userId = sessionData.session.user.id;
      }
    }
    if (!userId) return null;

    // プロフィール取得
    const { data: profileRow, error: pErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (pErr || !profileRow) return null;

    // 記事数（公開カラムがないため author_id で全件カウント）
    const { count: articlesCount, error: cErr } = await supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('author_id', userId);
    if (cErr) {
      console.warn('記事数取得エラー:', cErr.message);
    }

    // 総いいね数（likes の合計）
    const { data: likesRows, error: lErr } = await supabase
      .from('articles')
      .select('likes')
      .eq('author_id', userId);
    if (lErr) {
      console.warn('いいね合計取得エラー:', lErr.message);
    }
    const totalLikes = (likesRows ?? []).reduce((sum: number, r: any) => sum + (typeof r.likes === 'number' ? r.likes : 0), 0);

    return {
      profile: profileRow as Profile,
      articleCount: articlesCount ?? 0,
      totalLikes,
    };
  } catch (e) {
    console.error('getProfileWithStats unexpected error:', e);
    return null;
  }
}

/**
 * プロフィール情報を更新するServer Action
 * - 行がない場合は作成（upsert）
 */
export async function updateProfile(formData: FormData): Promise<{ success: boolean; message: string }> {
  'use server'
  try {
    const supabase = createServer();
    
    // 現在のセッションからユーザーIDを取得
    let userId: string | null = null;
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userData?.user?.id) {
      userId = userData.user.id;
    } else {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user?.id) {
        userId = sessionData.session.user.id;
      }
    }

    if (userError) {
      console.error('ユーザー認証エラー:', userError.message);
    }
    
    if (!userId) {
      return { success: false, message: 'ログインしていません。' };
    }
    
    // フォームデータを取得・検証
    const full_name = String(formData.get('full_name') ?? '').trim();
    const username = String(formData.get('username') ?? '').trim();
    const career = String(formData.get('career') ?? '').trim() || null;
    const bio = String(formData.get('bio') ?? '').trim() || null;
    const consideration_start_date = String(formData.get('consideration_start_date') ?? '').trim() || null;
    const entrepreneurship_start_date = String(formData.get('entrepreneurship_start_date') ?? '').trim() || null;
    
    // バリデーション
    if (!full_name) {
      return { success: false, message: 'フルネームは必須です。' };
    }
    
    if (!username) {
      return { success: false, message: 'ユーザー名は必須です。' };
    }
    
    if (username.length < 3) {
      return { success: false, message: 'ユーザー名は3文字以上で入力してください。' };
    }
    
    // プロフィール画像のアップロード処理
    let avatar_url: string | undefined = undefined
    const profileImageFile = formData.get('profile_image') as File | null
    
    if (profileImageFile && profileImageFile.size > 0) {
      const uploadResult = await uploadImage('avatars', profileImageFile)
      if (uploadResult.success && uploadResult.publicUrl) {
        avatar_url = uploadResult.publicUrl
      } else {
        return { success: false, message: uploadResult.message || 'プロフィール画像のアップロードに失敗しました。' }
      }
    }
    
    // プロフィール更新（スキーマ準拠）
    const updateData: Record<string, any> = {
      full_name,
      username,
      career,
      bio,
      consideration_start_date,
      entrepreneurship_start_date,
      updated_at: new Date().toISOString(),
    }
    
    // 画像がアップロードされた場合のみavatar_urlを更新
    if (avatar_url) {
      updateData.avatar_url = avatar_url
    }
    
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId)

    if (updateError) {
      console.error('プロフィール更新エラー:', updateError.message);
      // 一意制約エラーの場合
      if (updateError.code === '23505' && updateError.message.includes('username')) {
        return { success: false, message: 'そのユーザー名は既に使用されています。別のユーザー名をお試しください。' };
      }
      return { success: false, message: 'プロフィールの更新に失敗しました。時間をおいて再度お試しください。' };
    }
    
    // キャッシュをクリア
    revalidatePath('/profile');
    
    return { success: true, message: 'プロフィールを更新しました。' };
    
  } catch (error) {
    console.error('プロフィール更新中の予期しないエラー:', error);
    return { success: false, message: 'プロフィールの更新に失敗しました。' };
  }
}

/**
 * useFormState から呼び出すためのラッパー Server Action
 */
export async function updateProfileWithState(
  _prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'
  const result = await updateProfile(formData)
  return result
} 