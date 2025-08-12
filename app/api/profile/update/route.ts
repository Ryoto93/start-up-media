import { NextRequest, NextResponse } from 'next/server';
import { updateProfile } from '@/lib/data/profiles';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const result = await updateProfile(formData);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { success: false, message: 'プロフィールの更新に失敗しました。' },
      { status: 500 }
    );
  }
} 