export interface CreateArticleState {
  success: boolean
  message: string
}

export async function createArticle(formData: FormData): Promise<CreateArticleState> {
  'use server'
  const { createServer } = await import('@/lib/supabase/server')
  const { revalidatePath } = await import('next/cache')
  const { redirect } = await import('next/navigation')

  try {
    const supabase = createServer()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) {
      console.error('認証エラー:', userError.message)
      return { success: false, message: '認証に失敗しました。再度ログインしてください。' }
    }
    if (!user) {
      return { success: false, message: 'ログインしていません。' }
    }

    const title = String(formData.get('title') ?? '').trim()
    const summary = String(formData.get('summary') ?? '').trim() || null
    const content = String(formData.get('content') ?? '').trim()
    const actual_event_date_raw = String(formData.get('actual_event_date') ?? '').trim()
    const phase = String(formData.get('phase') ?? '').trim()
    const outcome = String(formData.get('outcome') ?? '').trim() || null

    let categories: string[] = []
    const categoriesRaw = formData.get('categories')
    if (typeof categoriesRaw === 'string' && categoriesRaw.trim().length > 0) {
      try {
        const parsed = JSON.parse(categoriesRaw)
        if (Array.isArray(parsed)) {
          categories = parsed.map(String)
        }
      } catch (e) {
        console.warn('カテゴリJSONの解析に失敗:', e)
      }
    }

    if (!title) return { success: false, message: 'タイトルは必須です。' }
    if (!content) return { success: false, message: '本文は必須です。' }
    if (!actual_event_date_raw) return { success: false, message: '出来事の日付は必須です。' }
    if (!phase) return { success: false, message: '起業フェーズは必須です。' }

    const actual_event_date = actual_event_date_raw

    const { error: insertError } = await supabase
      .from('articles')
      .insert([
        {
          title,
          summary,
          content,
          author_id: user.id,
          phase,
          outcome,
          categories,
          actual_event_date,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])

    if (insertError) {
      console.error('記事作成エラー:', insertError.message)
      return { success: false, message: '記事の作成に失敗しました。時間をおいて再度お試しください。' }
    }

    revalidatePath('/articles')
    revalidatePath('/profile')
    redirect('/profile')
    return { success: true, message: 'redirected' }
  } catch (error) {
    console.error('記事作成中の予期しないエラー:', error)
    return { success: false, message: '記事の作成に失敗しました。' }
  }
}

export async function createArticleWithState(
  _prevState: CreateArticleState,
  formData: FormData
): Promise<CreateArticleState> {
  'use server'
  const result = await createArticle(formData)
  return result
} 