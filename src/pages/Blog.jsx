import React, { useMemo, useState } from 'react';
import PageLayout from '../components/common/PageLayout';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import BlogList from '../components/blog/BlogList';
import BlogSearch from '../components/blog/BlogSearch';
import { useBlogData } from '../hooks/useBlogData';
import { useSeo } from '../utils/seo';
import { useI18n } from '../i18n/I18nProvider';

const ALL = '__all';

const Blog = () => {
    const { posts, searchPosts } = useBlogData();
    const [searchQuery, setSearchQuery] = useState('');
    const { t } = useI18n();
    const [category, setCategory] = useState(ALL);

    useSeo({
        title: t('seo.blog.title'),
        description: t('seo.blog.description'),
        path: '/blog',
    });

    const categories = useMemo(() => [ALL, ...new Set(posts.map((p) => p.category).filter(Boolean))], [posts]);
    const filteredPosts = useMemo(() => {
        const base = searchQuery.trim() ? searchPosts(searchQuery) : posts;
        return category === ALL ? base : base.filter((p) => p.category === category);
    }, [posts, searchPosts, searchQuery, category]);

    return (
        <PageLayout>
            <Section padding="pt-36 pb-12 md:pt-44" className="overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
                    <div className="absolute -top-32 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
                </div>
                <Container>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="eyebrow">{t('blog.eyebrow')}</span>
                        <h1 className="mt-5 text-4xl font-semibold md:text-6xl">
                            {t('blog.title')} <span className="text-gradient">{t('blog.highlight')}</span>
                        </h1>
                        <p className="mt-5 text-lg text-slate-400">
                            {t('blog.description')}
                        </p>
                        <div className="mt-9">
                            <BlogSearch value={searchQuery} onChange={setSearchQuery} />
                        </div>
                        <div className="mt-5 flex flex-wrap justify-center gap-2">
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCategory(c)}
                                    aria-pressed={category === c}
                                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                                        category === c ? 'border-brand-300/50 bg-brand-400/15 text-white' : 'border-white/10 text-slate-400 hover:text-white'
                                    }`}
                                >{c === ALL ? t('blog.all') : c}</button>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            <Section padding="pb-24">
                <Container>
                    {searchQuery && (
                        <p className="mb-6 text-sm text-slate-400" aria-live="polite">
                            {t(filteredPosts.length === 1 ? 'blog.resultOne' : 'blog.resultMany', { n: filteredPosts.length, q: searchQuery })}
                        </p>
                    )}
                    <BlogList posts={filteredPosts} />
                </Container>
            </Section>
        </PageLayout>
    );
};

export default Blog;
