import { createServer } from '@/lib/supabase/server';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
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
      .select('*')
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