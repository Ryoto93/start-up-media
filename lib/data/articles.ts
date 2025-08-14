'use server'

import { Article, Phase, OutcomeType, BusinessArea, ArticleWithProfile, ProfileDetails } from '@/types';
import { createStaticClient } from '@/lib/supabase/server';
import { uploadImage, UploadImageResult } from '@/lib/data/storage';

// 記事データの集約（モックデータ: 将来的な削除候補。現在は空配列で保持）
const allArticles: Article[] = [];

type ArticleRow = {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string | null;
  author_id: string | null;
  likes: number | null;
  phase: string;
  outcome: string;
  categories: string[];
  date: string;
  event_date: string | null;
  actual_event_date: string | null;
  image_url: string | null;
  created_at?: string;
  is_published?: boolean | null;
  // likes_count カラムを併用（移行互換）
  likes_count?: number | null;
  updated_at?: string | null;
};

function mapRowToArticle(row: ArticleRow, profile?: { full_name: string | null; avatar_url: string | null; username?: string | null }): Article {
  const authorName = profile?.full_name ?? row.author ?? '匿名';
  const likesCount = (row as any).likes_count ?? row.likes ?? 0;
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    content: row.content,
    author: authorName,
    author_id: row.author_id,
    likes: typeof likesCount === 'number' ? likesCount : 0,
    phase: row.phase as Phase,
    outcome: row.outcome as OutcomeType,
    categories: (row.categories ?? []) as BusinessArea[],
    date: row.date,
    event_date: row.event_date,
    actual_event_date: row.actual_event_date,
    image_url: row.image_url,
    created_at: row.created_at ?? new Date().toISOString(),
    updated_at: (row as any).updated_at ?? null,
  };
}

// 全記事を取得する関数（Supabase）
export async function getAllArticles(): Promise<Article[]> {
  try {
    // Articles are public; avoid cookies during SSG/SSR
    const supabase = createStaticClient();

    // まず actual_event_date でのソートを試みる
    let { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('actual_event_date', { ascending: false });

    // カラムが存在しない場合は date でフォールバック
    if (error && /does not exist/i.test(error.message)) {
      const fallback = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });
      articles = fallback.data as any;
      error = fallback.error as any;
    }

    if (error) {
      console.error('Failed to fetch articles:', error.message);
      return [];
    }

    if (!articles || articles.length === 0) {
      return [];
    }

    // プロファイルをまとめて取得して擬似JOIN
    const authorIds = Array.from(
      new Set((articles as ArticleRow[]).map((a) => a.author_id).filter((v): v is string => !!v))
    );

    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', authorIds);

      if (profilesError) {
        console.warn('Failed to fetch profiles:', profilesError.message);
      } else if (profiles) {
        profilesMap = new Map(profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url }]));
      }
    }

    return (articles as ArticleRow[]).map((row) =>
      mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined)
    );
  } catch (e) {
    console.error('Unexpected error in getAllArticles:', e);
    return [];
  }
}

// 指定されたIDの記事を取得する関数（Supabase）
export async function getArticleById(id: string): Promise<ArticleWithProfile | null> {
  try {
    const supabase = createStaticClient();

    // 優先: プロファイルJOINで取得（author_id -> profiles.id）
    const { data: joined, error: joinError } = await supabase
      .from('articles')
      .select(`
        *,
        authorProfile:profiles!articles_author_id_fkey(
          id, username, full_name, avatar_url, career, bio, age, consideration_start_date, entrepreneurship_start_date
        )
      `)
      .eq('id', id)
      .maybeSingle();

    if (!joinError && joined) {
      const row = joined as any;
      const article = mapRowToArticle(row as ArticleRow, row.authorProfile ? { full_name: row.authorProfile.full_name, avatar_url: row.authorProfile.avatar_url, username: row.authorProfile.username } : undefined);
      const authorProfile: ProfileDetails | undefined = row.authorProfile
        ? {
            id: row.authorProfile.id,
            username: row.authorProfile.username ?? null,
            full_name: row.authorProfile.full_name ?? null,
            avatar_url: row.authorProfile.avatar_url ?? null,
            website: null,
            created_at: new Date().toISOString(),
            updated_at: null,
            age: row.authorProfile.age ?? null,
            career: row.authorProfile.career ?? null,
            bio: row.authorProfile.bio ?? null,
            consideration_start_date: row.authorProfile.consideration_start_date ?? null,
            entrepreneurship_start_date: row.authorProfile.entrepreneurship_start_date ?? null,
          }
        : undefined;

      return { ...article, authorProfile };
    }

    // フォールバック: 単体取得 + プロファイル別取得
    const { data: row, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Failed to fetch article by id:', error.message);
      return null;
    }

    if (!row) return null;

    let authorProfile: ProfileDetails | undefined = undefined;
    const authorId = (row as ArticleRow).author_id;
    if (authorId) {
      const { data: p, error: pErr } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url, career, bio, age, consideration_start_date, entrepreneurship_start_date, created_at, updated_at, website')
        .eq('id', authorId)
        .maybeSingle();
      if (!pErr && p) {
        authorProfile = p as unknown as ProfileDetails;
      }
    }

    const article = mapRowToArticle(row as ArticleRow, authorProfile ? { full_name: authorProfile.full_name, avatar_url: authorProfile.avatar_url, username: authorProfile.username ?? undefined } : undefined);
    return { ...article, authorProfile };
  } catch (e) {
    console.error('Unexpected error in getArticleById:', e);
    return null;
  }
}

// 記事ID一覧を取得する関数（静的生成用, Supabase）
export async function getAllArticleIds() {
  try {
    // Use a static client in SSG context to avoid cookies() requirement
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('articles')
      .select('id');

    if (error) {
      console.error('Failed to fetch article ids:', error.message);
      return [] as { id: string }[];
    }

    return (data ?? []).map((a: any) => ({ id: String(a.id) }));
  } catch (e) {
    console.error('Unexpected error in getAllArticleIds:', e);
    return [] as { id: string }[];
  }
}

// 記事の検索・フィルタリング・ソート（モックデータでのローカル動作用）
export async function searchArticles(filters: {
  phase?: string;
  outcome?: string;
  categories?: string[];
  searchKeyword?: string;
  sortBy?: string;
}): Promise<Article[]> {
  let filtered = [...allArticles];

  if (filters.phase) {
    filtered = filtered.filter(article => article.phase === filters.phase);
  }

  if (filters.outcome) {
    filtered = filtered.filter(article => article.outcome === filters.outcome);
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(article => 
      filters.categories!.some((category: string) => article.categories.includes(category as BusinessArea))
    );
  }

  if (filters.searchKeyword) {
    const keyword = filters.searchKeyword.toLowerCase();
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(keyword) ||
      article.summary.toLowerCase().includes(keyword) ||
      article.author.toLowerCase().includes(keyword)
    );
  }

  switch (filters.sortBy) {
    case 'popular':
      filtered = [...filtered].sort((a, b) => b.likes - a.likes);
      break;
    case 'date':
      filtered = [...filtered].sort((a, b) => new Date(b.actual_event_date || b.event_date || b.date).getTime() - new Date(a.actual_event_date || a.event_date || a.date).getTime());
      break;
    case 'newest':
    default:
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
  }

  return filtered;
}

// NEW: 特定のユーザーの投稿記事を取得（出来事日昇順）
export async function getArticlesByAuthorId(authorId: string): Promise<Article[]> {
  try {
    const supabase = createStaticClient();

    // event_date の昇順で取得（古い順）
    let { data: rows, error } = await supabase
      .from('articles')
      .select('*')
      .eq('author_id', authorId)
      .order('event_date', { ascending: true });

    // event_date カラムが存在しない場合は actual_event_date でフォールバック
    if (error && /does not exist/i.test(error.message)) {
      const fallback = await supabase
        .from('articles')
        .select('*')
        .eq('author_id', authorId)
        .order('actual_event_date', { ascending: true });
      rows = fallback.data as any;
      error = fallback.error as any;
    }

    if (error) {
      console.error('Failed to fetch articles by author:', error.message);
      return [];
    }

    const articles = (rows ?? []) as ArticleRow[];
    if (articles.length === 0) return [];

    const authorIds = Array.from(new Set(articles.map(a => a.author_id).filter((v): v is string => !!v)));
    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null; username?: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, username')
        .in('id', authorIds);
      if (pErr) {
        console.warn('Failed to fetch profiles for author join:', pErr.message);
      } else if (profiles) {
        profilesMap = new Map(
          profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url, username: p.username }])
        );
      }
    }

    return articles.map(row => mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined));
  } catch (e) {
    console.error('Unexpected error in getArticlesByAuthorId:', e);
    return [];
  }
}

// NEW: 公開記事すべて（作成日降順）
export async function getAllPublishedArticles(): Promise<Article[]> {
  try {
    const supabase = createStaticClient();

    const { data: rows, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch published articles:', error.message);
      return [];
    }

    const articles = (rows ?? []) as ArticleRow[];
    if (articles.length === 0) return [];

    const authorIds = Array.from(new Set(articles.map(a => a.author_id).filter((v): v is string => !!v)));
    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null; username?: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, username')
        .in('id', authorIds);
      if (pErr) {
        console.warn('Failed to fetch profiles for published join:', pErr.message);
      } else if (profiles) {
        profilesMap = new Map(
          profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url, username: p.username }])
        );
      }
    }

    return articles.map(row => mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined));
  } catch (e) {
    console.error('Unexpected error in getAllPublishedArticles:', e);
    return [];
  }
}

// トレンド記事（いいね数降順）
export async function getTrendingArticles(limit: number): Promise<Article[]> {
  try {
    const supabase = createStaticClient();

    let { data: rows, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('likes_count', { ascending: false })
      .limit(limit);

    // likes_count が存在しない場合は likes でフォールバック
    if (error && /does not exist/i.test(error.message)) {
      const fallback = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('likes', { ascending: false })
        .limit(limit);
      rows = fallback.data as any;
      error = fallback.error as any;
    }

    if (error) {
      console.error('Failed to fetch trending articles:', error.message);
      return [];
    }

    const articles = (rows ?? []) as ArticleRow[];
    if (articles.length === 0) return [];

    const authorIds = Array.from(new Set(articles.map(a => a.author_id).filter((v): v is string => !!v)));
    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null; username?: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, username')
        .in('id', authorIds);
      if (pErr) {
        console.warn('Failed to fetch profiles for trending join:', pErr.message);
      } else if (profiles) {
        profilesMap = new Map(
          profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url, username: p.username }])
        );
      }
    }

    return articles.map(row => mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined));
  } catch (e) {
    console.error('Unexpected error in getTrendingArticles:', e);
    return [];
  }
}

// 最新記事（作成日降順）
export async function getLatestArticles(limit: number): Promise<Article[]> {
  try {
    const supabase = createStaticClient();

    const { data: rows, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch latest articles:', error.message);
      return [];
    }

    const articles = (rows ?? []) as ArticleRow[];

    if (articles.length === 0) return [];

    const authorIds = Array.from(new Set(articles.map(a => a.author_id).filter((v): v is string => !!v)));
    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null; username?: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, username')
        .in('id', authorIds);
      if (pErr) {
        console.warn('Failed to fetch profiles for latest join:', pErr.message);
      } else if (profiles) {
        profilesMap = new Map(
          profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url, username: p.username }])
        );
      }
    }

    return articles.map(row => mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined));
  } catch (e) {
    console.error('Unexpected error in getLatestArticles:', e);
    return [];
  }
}

// 人気記事（いいね総数降順）
export async function getPopularArticles(limit: number): Promise<Article[]> {
  try {
    const supabase = createStaticClient();

    let { data: rows, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('likes_count', { ascending: false })
      .limit(limit);

    if (error && /does not exist/i.test(error.message)) {
      const fallback = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('likes', { ascending: false })
        .limit(limit);
      rows = fallback.data as any;
      error = fallback.error as any;
    }

    if (error) {
      console.error('Failed to fetch popular articles:', error.message);
      return [];
    }

    const articles = (rows ?? []) as ArticleRow[];
    if (articles.length === 0) return [];

    const authorIds = Array.from(new Set(articles.map(a => a.author_id).filter((v): v is string => !!v)));
    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null; username?: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, username')
        .in('id', authorIds);
      if (pErr) {
        console.warn('Failed to fetch profiles for popular join:', pErr.message);
      } else if (profiles) {
        profilesMap = new Map(
          profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url, username: p.username }])
        );
      }
    }

    return articles.map(row => mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined));
  } catch (e) {
    console.error('Unexpected error in getPopularArticles:', e);
    return [];
  }
}

// Fetch related articles by current article id (phase/cateogries/outcome match). Excludes self, limits to 3.
export async function getRelatedArticlesById(currentId: string, limit: number = 3): Promise<Article[]> {
  try {
    const supabase = createStaticClient();

    // get the current row first
    const { data: currentRow, error: curErr } = await supabase
      .from('articles')
      .select('*')
      .eq('id', currentId)
      .maybeSingle();
    if (curErr || !currentRow) return [];

    const c = currentRow as ArticleRow;
    const phase = c.phase;
    const outcome = c.outcome;
    const categories = c.categories ?? [];

    // Collect candidates by simple unions (phase, outcome, categories overlap)
    const results: ArticleRow[] = [];

    // by phase
    const { data: byPhase } = await supabase
      .from('articles')
      .select('*')
      .neq('id', currentId)
      .eq('phase', phase)
      .limit(limit * 2);
    if (byPhase) results.push(...(byPhase as any));

    // by outcome
    const { data: byOutcome } = await supabase
      .from('articles')
      .select('*')
      .neq('id', currentId)
      .eq('outcome', outcome)
      .limit(limit * 2);
    if (byOutcome) results.push(...(byOutcome as any));

    // by category overlap (if categories exist)
    if (categories.length > 0) {
      const { data: byCats } = await supabase
        .from('articles')
        .select('*')
        .neq('id', currentId)
        .overlaps('categories', categories as any)
        .limit(limit * 2);
      if (byCats) results.push(...(byCats as any));
    }

    // Deduplicate, exclude self, prefer newer date
    const dedup = new Map<string, ArticleRow>();
    for (const r of results) {
      if (r.id === currentId) continue;
      const existing = dedup.get(r.id);
      if (!existing) dedup.set(r.id, r as ArticleRow);
    }
    const unique = Array.from(dedup.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const limited = unique.slice(0, limit);

    // Fetch author profiles
    const authorIds = Array.from(new Set(limited.map(a => a.author_id).filter((v): v is string => !!v)));
    let profilesMap = new Map<string, { full_name: string | null; avatar_url: string | null }>();
    if (authorIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', authorIds);
      if (profiles) {
        profilesMap = new Map(profiles.map((p: any) => [p.id as string, { full_name: p.full_name, avatar_url: p.avatar_url }]));
      }
    }

    return limited.map((row) => mapRowToArticle(row, row.author_id ? profilesMap.get(row.author_id) : undefined));
  } catch (e) {
    console.error('Unexpected error in getRelatedArticlesById:', e);
    return [];
  }
}

// Compute prev/next for an author's articles (chronological by event_date ascending)
export async function getPrevNextForAuthor(authorId: string, currentId: string): Promise<{ prev: Article | null; next: Article | null; index: number; total: number; firstEventDate?: string | null; }> {
  const list = await getArticlesByAuthorId(authorId);
  const total = list.length;
  const index = Math.max(0, list.findIndex(a => a.id === currentId));
  const prev = index > 0 ? list[index - 1] : null;
  const next = index < total - 1 && index >= 0 ? list[index + 1] : null;
  const firstEventDate = total > 0 ? (list[0].actual_event_date || list[0].event_date || list[0].date) : null;
  return { prev, next, index, total, firstEventDate };
}

export async function uploadArticleImage(formData: FormData): Promise<UploadImageResult> {
  const file = formData.get('image') as File;
  
  if (!file) {
    return {
      success: false,
      message: 'ファイルが選択されていません。',
      error: 'ファイルが選択されていません。'
    };
  }

  return await uploadImage('articles', file);
}

 