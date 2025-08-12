export interface CreateArticleState {
  success: boolean
  message: string
}

export async function createArticle(formData: FormData): Promise<CreateArticleState> {
  'use server'
  const { createServer } = await import('@/lib/supabase/server')

  let ok = false
  try {
    const supabase = createServer()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) {
      console.error('認証エラー:', userError.message)
      return { success: false, message: '記事の投稿に失敗しました。' }
    }
    if (!user) {
      return { success: false, message: '記事の投稿に失敗しました。' }
    }

    const title = String(formData.get('title') ?? '').trim()
    const summaryRaw = String(formData.get('summary') ?? '').trim()
    const content = String(formData.get('content') ?? '').trim()
    const actual_event_date_raw = String(formData.get('actual_event_date') ?? '').trim()
    const phase = String(formData.get('phase') ?? '').trim()
    const outcomeRaw = String(formData.get('outcome') ?? '').trim()

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

    if (!title || !content || !actual_event_date_raw || !phase) {
      return { success: false, message: '記事の投稿に失敗しました。' }
    }

    const summary = summaryRaw || ''
    const outcome = outcomeRaw || ''
    const actual_event_date = actual_event_date_raw
    const nowIso = new Date().toISOString()

    const basePayload = {
      title,
      summary,
      content,
      author_id: user.id,
      phase,
      outcome,
      categories,
      created_at: nowIso,
      updated_at: nowIso,
    }

    let { error: insertError } = await supabase
      .from('articles')
      .insert([{ ...basePayload, actual_event_date }])

    if (insertError && /actual_event_date/.test(insertError.message)) {
      const retry = await supabase
        .from('articles')
        .insert([{ ...basePayload, event_date: actual_event_date }])
      insertError = retry.error
    }

    if (insertError) {
      console.error('記事作成エラー:', insertError)
      return { success: false, message: '記事の投稿に失敗しました。' }
    }

    ok = true
  } catch (error) {
    console.error('記事作成中の予期しないエラー:', error)
    return { success: false, message: '記事の投稿に失敗しました。' }
  }

  if (ok) {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/articles')
    revalidatePath('/profile')
    const { redirect } = await import('next/navigation')
    redirect('/profile')
  }

  return { success: true, message: 'redirected' }
}

export async function createArticleWithState(
  _prevState: CreateArticleState,
  formData: FormData
): Promise<CreateArticleState> {
  'use server'
  const result = await createArticle(formData)
  return result
} 