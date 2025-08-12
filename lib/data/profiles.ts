import { createServer } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  full_name: string;
  username: string;
  website?: string;
}

/**
 * 現在ログインしているユーザーのプロフィール情報を取得
 * @returns プロフィール情報、またはログインしていない場合はnull
 */
export async function getProfile(): Promise<Profile | null> {
  try {
    const supabase = createServer();
    
    // 現在のセッションからユーザーIDを取得
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('ユーザー認証エラー:', userError.message);
      return null;
    }
    
    if (!user) {
      // ログインしていない場合
      return null;
    }
    
    // profilesテーブルからプロフィール情報を取得
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, website, created_at, updated_at')
      .eq('id', user.id)
      .maybeSingle();
    
    if (profileError) {
      console.error('プロフィール取得エラー:', profileError.message);
      return null;
    }
    
    if (!profile) {
      // プロフィールが見つからない場合
      return null;
    }
    
    return profile as Profile;
    
  } catch (error) {
    console.error('プロフィール取得中の予期しないエラー:', error);
    return null;
  }
}

/**
 * プロフィール情報を更新するServer Action
 * @param formData フォームデータ
 * @returns 更新結果
 */
export async function updateProfile(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = createServer();
    
    // 現在のセッションからユーザーIDを取得
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('ユーザー認証エラー:', userError.message);
      return { success: false, message: '認証に失敗しました。再度ログインしてください。' };
    }
    
    if (!user) {
      return { success: false, message: 'ログインしていません。' };
    }
    
    // フォームデータを取得・検証
    const full_name = String(formData.get('full_name') ?? '').trim();
    const username = String(formData.get('username') ?? '').trim();
    const website = String(formData.get('website') ?? '').trim();
    
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
    
    // プロフィール更新
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name,
        username,
        website: website || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
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