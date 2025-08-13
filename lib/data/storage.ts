'use server'

import { createServer } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';

type BucketName = 'avatars' | 'articles';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface UploadImageResult {
  success: boolean;
  publicUrl?: string;
  message: string;
  // Added for better error surfacing and API ergonomics
  error?: string;
  url?: string;
}

/**
 * 汎用的な画像アップロードServer Action
 * @param bucketName アップロード先のバケット ('avatars' | 'articles')
 * @param file アップロードするファイル
 * @returns アップロード結果と公開URL
 */
export async function uploadImage(
  bucketName: BucketName,
  file: File
): Promise<UploadImageResult> {
  try {
    // ファイルバリデーション
    if (!file || file.size === 0) {
      return {
        success: false,
        message: 'ファイルが選択されていません。',
        error: 'ファイルが選択されていません。'
      };
    }

    // ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: `ファイルサイズが大きすぎます。${MAX_FILE_SIZE / (1024 * 1024)}MB以下のファイルを選択してください。`,
        error: `File size exceeds limit (${MAX_FILE_SIZE / (1024 * 1024)}MB).`
      };
    }

    // ファイルタイプチェック
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type as any)) {
      return {
        success: false,
        message: '対応していないファイル形式です。JPEG、PNG、WebP形式のファイルを選択してください。',
        error: `Unsupported content type: ${file.type}`
      };
    }

    const supabase = createServer();

    // 現在のユーザーID取得
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

    if (!userId) {
      return {
        success: false,
        message: 'ログインが必要です。',
        error: 'Unauthorized: user not found in session.'
      };
    }

    // ユニークなファイルパス生成
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const uniqueId = uuidv4();
    const filePath = `${userId}/${timestamp}-${uniqueId}.${fileExtension}`;

    // ファイルをArrayBufferに変換
    const fileBuffer = await file.arrayBuffer();

    // Supabase Storageにアップロード
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('アップロードエラー:', uploadError);
      return {
        success: false,
        message: '画像のアップロードに失敗しました。時間をおいて再度お試しください。',
        error: uploadError.message
      };
    }

    // 公開URLを取得
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (!urlData.publicUrl) {
      return {
        success: false,
        message: '画像の公開URLの取得に失敗しました。',
        error: 'Failed to resolve public URL from storage.'
      };
    }

    return {
      success: true,
      publicUrl: urlData.publicUrl,
      url: urlData.publicUrl,
      message: '画像のアップロードが完了しました。'
    };

  } catch (error) {
    console.error('uploadImage中の予期しないエラー:', error);
    return {
      success: false,
      message: '画像のアップロードに失敗しました。時間をおいて再度お試しください。',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * 記事内画像をアップロードするServer Action
 * @param file アップロードするファイル
 * @returns アップロード結果と公開URL
 */
export async function uploadArticleImage(file: File): Promise<UploadImageResult> {
  'use server'
  
  try {
    const result = await uploadImage('articles', file);
    return result;
  } catch (error) {
    console.error('uploadArticleImage中の予期しないエラー:', error);
    return {
      success: false,
      message: '画像のアップロードに失敗しました。時間をおいて再度お試しください。',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}