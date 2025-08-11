'use server'

import { createServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

interface CreateProfileData {
  username: string;
  full_name: string;
}

/**
 * ユーザープロフィールを作成するServer Action
 * @param data フォームから送信されたデータ
 */
export async function createProfile(data: CreateProfileData) {
  try {
    const supabase = createServer();
    
    // 現在ログインしているユーザーのIDを取得
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('ユーザー認証エラー:', userError.message);
      throw new Error('認証に失敗しました。再度ログインしてください。');
    }
    
    if (!user) {
      throw new Error('ログインしていません。');
    }
    
    // profilesテーブルにプロフィール情報を挿入
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        username: data.username,
        full_name: data.full_name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (insertError) {
      console.error('プロフィール作成エラー:', insertError.message);
      throw new Error('プロフィールの作成に失敗しました。');
    }
    
    // 成功時はプロフィールページにリダイレクト
    redirect('/profile');
    
  } catch (error) {
    console.error('プロフィール作成中の予期しないエラー:', error);
    
    // エラーメッセージを返す（フォームで表示するため）
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('プロフィールの作成に失敗しました。');
    }
  }
} 