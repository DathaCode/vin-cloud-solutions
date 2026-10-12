import { useMemo } from 'react';
import { parseMarkdown, generateSlug } from '../utils/blogParser';
import { useI18n } from '../i18n/I18nProvider';

// English posts live in src/content/blog/*.md; translations in src/content/blog/<lang>/*.md with the SAME `slug`.
// New posts are picked up automatically (no imports to maintain). Run `npm run i18n:check` to find missing translations.
const files = import.meta.glob('../content/blog/**/*.md', { query: '?raw', import: 'default', eager: true });

const parse = (raw) => {
    const { frontMatter, content, readingTime } = parseMarkdown(raw);
    return { ...frontMatter, content, readingTime, slug: frontMatter.slug || generateSlug(frontMatter.title) };
};

const POSTS = { en: [] };
for (const [path, raw] of Object.entries(files)) {
    const rel = path.split('/content/blog/')[1];
    const lang = rel.includes('/') ? rel.split('/')[0] : 'en';
    (POSTS[lang] ||= []).push(parse(raw));
}

const byLang = {};
const postsFor = (lang) => {
    if (!byLang[lang]) {
        const translated = new Map((POSTS[lang] || []).map((p) => [p.slug, p]));
        byLang[lang] = POSTS.en
            // Untranslated posts fall back to English. `baseCategory` keeps the English category for cover colours.
            .map((en) => ({ ...en, ...(translated.get(en.slug) || {}), baseCategory: en.category, slug: en.slug }))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return byLang[lang];
};

export const useBlogData = () => {
    const { lang } = useI18n();
    const posts = postsFor(lang);

    return useMemo(() => ({
        posts,
        loading: false,
        getPostBySlug: (slug) => posts.find((post) => post.slug === slug),
        getLatestPosts: (count = 3) => posts.slice(0, count),
        searchPosts: (query) => {
            const q = query.toLowerCase();
            return posts.filter((post) =>
                post.title.toLowerCase().includes(q) ||
                post.excerpt.toLowerCase().includes(q) ||
                (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(q)))
            );
        },
    }), [posts]);
};
