import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { 
  HERO_OCEAN_IMAGE,
  INITIAL_ARTICLES, 
  INITIAL_CATEGORIES, 
  INITIAL_PROJECTS, 
  INITIAL_SETTINGS, 
  INITIAL_TAGS,
  RESIN_GEODE_IMAGE,
  RESIN_WORKSHOP_IMAGE
} from '../data/seedData';
import { 
  Article, 
  Category, 
  ContactMessage, 
  MediaItem, 
  NewsletterSubscriber, 
  Project, 
  SiteSettings, 
  Tag 
} from '../types';

// In-memory persistent cache for fallback and responsive instant state
let articlesCache: Article[] = [...INITIAL_ARTICLES];
let categoriesCache: Category[] = [...INITIAL_CATEGORIES];
let tagsCache: Tag[] = [...INITIAL_TAGS];
let projectsCache: Project[] = [...INITIAL_PROJECTS];
let messagesCache: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    subject: 'Question regarding wave paste ratio',
    message: 'Hello ResinArt team, what is the best percentage of white paste to avoid cell blowouts when using a heat gun?',
    status: 'new',
    created_at: '2026-03-26T14:22:00Z'
  },
  {
    id: 'msg-2',
    name: 'Marcus Vance',
    email: 'm.vance@craftworks.org',
    subject: 'Studio Safety Workshop Inquiry',
    message: 'We loved your comprehensive article on NIOSH vapor respirators. Can we cite your safety protocols for our community guild?',
    status: 'read',
    created_at: '2026-03-24T09:15:00Z'
  }
];
let subscribersCache: NewsletterSubscriber[] = [
  {
    id: 'sub-1',
    email: 'studio.maker@example.com',
    status: 'active',
    subscribed_at: '2026-03-12T11:00:00Z'
  },
  {
    id: 'sub-2',
    email: 'elena.artisan@crafts.com',
    status: 'active',
    subscribed_at: '2026-03-19T16:45:00Z'
  }
];
let mediaCache: MediaItem[] = [
  {
    id: 'med-1',
    file_name: 'hero_ocean_resin.jpg',
    storage_path: 'article-images/hero_ocean_resin.jpg',
    public_url: '/src/assets/images/hero_ocean_resin_1790528486021.jpg',
    alt_text: 'Macro view of handcrafted ocean resin waves with white foam lacing',
    uploaded_by: 'ResinArt Editor',
    created_at: '2026-03-15T08:00:00Z'
  },
  {
    id: 'med-2',
    file_name: 'resin_workshop_table.jpg',
    storage_path: 'site-assets/resin_workshop_table.jpg',
    public_url: '/src/assets/images/resin_workshop_beginner_1790528506485.jpg',
    alt_text: 'Artisan studio workshop table with epoxy bottles and mixing cups',
    uploaded_by: 'ResinArt Editor',
    created_at: '2026-03-18T10:00:00Z'
  },
  {
    id: 'med-3',
    file_name: 'resin_geode_tray.jpg',
    storage_path: 'project-images/resin_geode_tray.jpg',
    public_url: '/src/assets/images/resin_geode_tray_1790528520522.jpg',
    alt_text: 'Handcrafted resin geode serving tray with amethyst crystals and gold veining',
    uploaded_by: 'ResinArt Editor',
    created_at: '2026-03-22T14:00:00Z'
  },
  {
    id: 'med-4',
    file_name: 'resin_safety_gear.jpg',
    storage_path: 'site-assets/resin_safety_gear.jpg',
    public_url: '/src/assets/images/resin_craft_safety_1790528534838.jpg',
    alt_text: 'Organic vapor respirator mask, nitrile gloves, and goggles on workshop bench',
    uploaded_by: 'ResinArt Editor',
    created_at: '2026-03-24T09:00:00Z'
  }
];
let siteSettingsCache: SiteSettings = { ...INITIAL_SETTINGS };

// ==========================================
// ARTICLES SERVICE
// ==========================================

export async function getArticles(options?: {
  categorySlug?: string;
  featured?: boolean;
  search?: string;
  status?: 'published' | 'draft' | 'archived' | 'all';
}): Promise<Article[]> {
  const reqStatus = options?.status || 'published';

  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('articles').select('*, category:categories(*)');
      
      if (reqStatus !== 'all') {
        query = query.eq('status', reqStatus);
      }
      if (options?.featured !== undefined) {
        query = query.eq('featured', options.featured);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        let results = data as Article[];
        if (options?.categorySlug) {
          results = results.filter(a => a.category?.slug === options.categorySlug);
        }
        if (options?.search) {
          const s = options.search.toLowerCase();
          results = results.filter(a => 
            a.title.toLowerCase().includes(s) || 
            a.excerpt.toLowerCase().includes(s) ||
            a.content.toLowerCase().includes(s)
          );
        }
        return results;
      }
    } catch {
      // Fallback seamlessly to local store
    }
  }

  // Filter in-memory cache
  let list = [...articlesCache];
  if (reqStatus !== 'all') {
    list = list.filter(a => a.status === reqStatus);
  }
  if (options?.featured !== undefined) {
    list = list.filter(a => a.featured === options.featured);
  }
  if (options?.categorySlug) {
    list = list.filter(a => a.category?.slug === options.categorySlug);
  }
  if (options?.search) {
    const s = options.search.toLowerCase();
    list = list.filter(a => 
      a.title.toLowerCase().includes(s) || 
      a.excerpt.toLowerCase().includes(s) ||
      a.content.toLowerCase().includes(s)
    );
  }
  return list;
}

export async function getArticleBySlug(slug: string, allowDraft = false): Promise<Article | null> {
  if (isSupabaseConfigured) {
    try {
      let query = supabase
        .from('articles')
        .select('*, category:categories(*)')
        .eq('slug', slug);
      
      if (!allowDraft) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query.single();
      if (!error && data) {
        return data as Article;
      }
    } catch {
      // Fallback
    }
  }

  const match = articlesCache.find(a => a.slug === slug);
  if (!match) return null;
  if (!allowDraft && match.status !== 'published') return null;
  return match;
}

export async function saveArticle(article: Partial<Article>): Promise<Article> {
  const isNew = !article.id;
  const now = new Date().toISOString();

  const formatted: Article = {
    id: article.id || `art-${Date.now()}`,
    title: article.title || 'Untitled Article',
    slug: article.slug || `article-${Date.now()}`,
    excerpt: article.excerpt || '',
    content: article.content || '',
    featured_image: article.featured_image || HERO_OCEAN_IMAGE,
    category_id: article.category_id,
    category: categoriesCache.find(c => c.id === article.category_id),
    status: article.status || 'draft',
    featured: Boolean(article.featured),
    reading_time: article.reading_time || '5 min read',
    seo_title: article.seo_title || article.title,
    seo_description: article.seo_description || article.excerpt,
    canonical_url: `https://resin_art.vercel.app/articles/${article.slug}`,
    published_at: article.status === 'published' ? (article.published_at || now) : undefined,
    created_at: article.created_at || now,
    updated_at: now
  };

  if (isSupabaseConfigured) {
    try {
      const payload = {
        title: formatted.title,
        slug: formatted.slug,
        excerpt: formatted.excerpt,
        content: formatted.content,
        featured_image: formatted.featured_image,
        category_id: formatted.category_id,
        status: formatted.status,
        featured: formatted.featured,
        reading_time: formatted.reading_time,
        seo_title: formatted.seo_title,
        seo_description: formatted.seo_description,
        canonical_url: formatted.canonical_url,
        published_at: formatted.published_at,
        updated_at: now
      };

      if (isNew) {
        const { data, error } = await supabase.from('articles').insert([payload]).select('*, category:categories(*)').single();
        if (!error && data) return data as Article;
      } else {
        const { data, error } = await supabase.from('articles').update(payload).eq('id', formatted.id).select('*, category:categories(*)').single();
        if (!error && data) return data as Article;
      }
    } catch {
      // Local fallback
    }
  }

  // Update in cache
  if (isNew) {
    articlesCache = [formatted, ...articlesCache];
  } else {
    articlesCache = articlesCache.map(a => a.id === formatted.id ? formatted : a);
  }
  return formatted;
}

export async function deleteArticle(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('articles').delete().eq('id', id);
    } catch {
      // ignore
    }
  }
  articlesCache = articlesCache.filter(a => a.id !== id);
  return true;
}

// ==========================================
// PROJECTS SERVICE
// ==========================================

export async function getProjects(options?: {
  featured?: boolean;
  search?: string;
  status?: 'published' | 'draft' | 'all';
}): Promise<Project[]> {
  const reqStatus = options?.status || 'published';

  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('projects').select('*, materials:project_materials(*), steps:project_steps(*)');
      if (reqStatus !== 'all') {
        query = query.eq('status', reqStatus);
      }
      if (options?.featured !== undefined) {
        query = query.eq('featured', options.featured);
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        let results = data as Project[];
        if (options?.search) {
          const s = options.search.toLowerCase();
          results = results.filter(p => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s));
        }
        return results;
      }
    } catch {
      // fallback
    }
  }

  let list = [...projectsCache];
  if (reqStatus !== 'all') {
    list = list.filter(p => p.status === reqStatus);
  }
  if (options?.featured !== undefined) {
    list = list.filter(p => p.featured === options.featured);
  }
  if (options?.search) {
    const s = options.search.toLowerCase();
    list = list.filter(p => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s));
  }
  return list;
}

export async function getProjectBySlug(slug: string, allowDraft = false): Promise<Project | null> {
  if (isSupabaseConfigured) {
    try {
      let query = supabase
        .from('projects')
        .select('*, materials:project_materials(*), steps:project_steps(*)')
        .eq('slug', slug);
      if (!allowDraft) {
        query = query.eq('status', 'published');
      }
      const { data, error } = await query.single();
      if (!error && data) return data as Project;
    } catch {
      // fallback
    }
  }

  const match = projectsCache.find(p => p.slug === slug);
  if (!match) return null;
  if (!allowDraft && match.status !== 'published') return null;
  return match;
}

export async function saveProject(project: Partial<Project>): Promise<Project> {
  const isNew = !project.id;
  const now = new Date().toISOString();

  const formatted: Project = {
    id: project.id || `proj-${Date.now()}`,
    title: project.title || 'Untitled Project',
    slug: project.slug || `project-${Date.now()}`,
    excerpt: project.excerpt || '',
    content: project.content || '',
    featured_image: project.featured_image || RESIN_GEODE_IMAGE,
    difficulty: project.difficulty || 'Beginner',
    estimated_time: project.estimated_time || '1 hour',
    featured: Boolean(project.featured),
    seo_title: project.seo_title || project.title,
    seo_description: project.seo_description || project.excerpt,
    status: project.status || 'draft',
    materials: project.materials || [],
    steps: project.steps || [],
    created_at: project.created_at || now,
    updated_at: now
  };

  if (isSupabaseConfigured) {
    try {
      const payload = {
        title: formatted.title,
        slug: formatted.slug,
        excerpt: formatted.excerpt,
        content: formatted.content,
        featured_image: formatted.featured_image,
        difficulty: formatted.difficulty,
        estimated_time: formatted.estimated_time,
        featured: formatted.featured,
        seo_title: formatted.seo_title,
        seo_description: formatted.seo_description,
        status: formatted.status,
        updated_at: now
      };

      if (isNew) {
        const { data } = await supabase.from('projects').insert([payload]).select().single();
        if (data) formatted.id = data.id;
      } else {
        await supabase.from('projects').update(payload).eq('id', formatted.id);
      }
    } catch {
      // ignore
    }
  }

  if (isNew) {
    projectsCache = [formatted, ...projectsCache];
  } else {
    projectsCache = projectsCache.map(p => p.id === formatted.id ? formatted : p);
  }
  return formatted;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch {
      // ignore
    }
  }
  projectsCache = projectsCache.filter(p => p.id !== id);
  return true;
}

// ==========================================
// CATEGORIES & TAGS
// ==========================================

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (!error && data && data.length > 0) return data as Category[];
    } catch {
      // fallback
    }
  }
  return categoriesCache;
}

export async function saveCategory(cat: Partial<Category>): Promise<Category> {
  const isNew = !cat.id;
  const formatted: Category = {
    id: cat.id || `cat-${Date.now()}`,
    name: cat.name || 'New Category',
    slug: cat.slug || `category-${Date.now()}`,
    description: cat.description || '',
    image_url: cat.image_url || RESIN_WORKSHOP_IMAGE,
    seo_title: cat.seo_title || cat.name,
    seo_description: cat.seo_description || cat.description
  };

  if (isSupabaseConfigured) {
    try {
      if (isNew) {
        await supabase.from('categories').insert([formatted]);
      } else {
        await supabase.from('categories').update(formatted).eq('id', formatted.id);
      }
    } catch {
      // ignore
    }
  }

  if (isNew) {
    categoriesCache = [...categoriesCache, formatted];
  } else {
    categoriesCache = categoriesCache.map(c => c.id === formatted.id ? formatted : c);
  }
  return formatted;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('categories').delete().eq('id', id);
    } catch {
      // ignore
    }
  }
  categoriesCache = categoriesCache.filter(c => c.id !== id);
  return true;
}

export async function getTags(): Promise<Tag[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('tags').select('*').order('name');
      if (!error && data && data.length > 0) return data as Tag[];
    } catch {
      // fallback
    }
  }
  return tagsCache;
}

export async function saveTag(tag: Partial<Tag>): Promise<Tag> {
  const isNew = !tag.id;
  const formatted: Tag = {
    id: tag.id || `tag-${Date.now()}`,
    name: tag.name || 'New Tag',
    slug: tag.slug || `tag-${Date.now()}`
  };

  if (isSupabaseConfigured) {
    try {
      if (isNew) {
        await supabase.from('tags').insert([formatted]);
      } else {
        await supabase.from('tags').update(formatted).eq('id', formatted.id);
      }
    } catch {
      // ignore
    }
  }

  if (isNew) {
    tagsCache = [...tagsCache, formatted];
  } else {
    tagsCache = tagsCache.map(t => t.id === formatted.id ? formatted : t);
  }
  return formatted;
}

export async function deleteTag(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('tags').delete().eq('id', id);
    } catch {
      // ignore
    }
  }
  tagsCache = tagsCache.filter(t => t.id !== id);
  return true;
}

// ==========================================
// CONTACT MESSAGES
// ==========================================

export async function submitContactMessage(msg: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  // Validate email & message size
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(msg.email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }
  if (!msg.name || msg.name.trim().length < 2) {
    return { success: false, message: 'Name must be at least 2 characters.' };
  }
  if (!msg.message || msg.message.trim().length < 10) {
    return { success: false, message: 'Message must be at least 10 characters.' };
  }
  if (msg.message.length > 3000) {
    return { success: false, message: 'Message exceeds maximum permitted length.' };
  }

  const record: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: msg.name.trim(),
    email: msg.email.trim().toLowerCase(),
    subject: msg.subject.trim() || 'General Inquiry',
    message: msg.message.trim(),
    status: 'new',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: record.name,
        email: record.email,
        subject: record.subject,
        message: record.message,
        status: record.status
      }]);
      if (error) {
        console.error('Supabase contact error:', error);
      }
    } catch (e) {
      console.warn('Supabase offline, using local store', e);
    }
  }

  messagesCache = [record, ...messagesCache];
  return { success: true, message: 'Thank you for reaching out. The ResinArt editorial team will respond shortly.' };
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as ContactMessage[];
    } catch {
      // fallback
    }
  }
  return messagesCache;
}

export async function updateContactMessageStatus(id: string, status: ContactMessage['status']): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('contact_messages').update({ status }).eq('id', id);
    } catch {
      // ignore
    }
  }
  messagesCache = messagesCache.map(m => m.id === id ? { ...m, status } : m);
  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('contact_messages').delete().eq('id', id);
    } catch {
      // ignore
    }
  }
  messagesCache = messagesCache.filter(m => m.id !== id);
  return true;
}

// ==========================================
// NEWSLETTER SUBSCRIBERS
// ==========================================

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanEmail = email.trim().toLowerCase();

  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  // Prevent duplicate subscriptions
  const existing = subscribersCache.find(s => s.email === cleanEmail && s.status === 'active');
  if (existing) {
    return { success: true, message: 'You are already subscribed to the ResinArt newsletter.' };
  }

  const record: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    email: cleanEmail,
    status: 'active',
    subscribed_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      await supabase.from('newsletter_subscribers').insert([{
        email: cleanEmail,
        status: 'active'
      }]);
    } catch {
      // ignore
    }
  }

  subscribersCache = [record, ...subscribersCache];
  return { success: true, message: 'Welcome to ResinArt! Check your inbox for the latest guides and tips.' };
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false });
      if (!error && data) return data as NewsletterSubscriber[];
    } catch {
      // fallback
    }
  }
  return subscribersCache;
}

export async function unsubscribeNewsletter(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('newsletter_subscribers').update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() }).eq('id', id);
    } catch {
      // ignore
    }
  }
  subscribersCache = subscribersCache.map(s => s.id === id ? { ...s, status: 'unsubscribed' } : s);
  return true;
}

// ==========================================
// MEDIA LIBRARY
// ==========================================

export async function getMediaItems(): Promise<MediaItem[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as MediaItem[];
    } catch {
      // fallback
    }
  }
  return mediaCache;
}

export async function addMediaItem(item: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> {
  const newItem: MediaItem = {
    id: `med-${Date.now()}`,
    ...item,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      const { data } = await supabase.from('media').insert([{
        file_name: newItem.file_name,
        storage_path: newItem.storage_path,
        public_url: newItem.public_url,
        alt_text: newItem.alt_text,
        uploaded_by: newItem.uploaded_by
      }]).select().single();
      if (data) newItem.id = data.id;
    } catch {
      // ignore
    }
  }

  mediaCache = [newItem, ...mediaCache];
  return newItem;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('media').delete().eq('id', id);
    } catch {
      // ignore
    }
  }
  mediaCache = mediaCache.filter(m => m.id !== id);
  return true;
}

// ==========================================
// SITE SETTINGS
// ==========================================

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettingsCache;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  siteSettingsCache = { ...siteSettingsCache, ...settings };
  return siteSettingsCache;
}
