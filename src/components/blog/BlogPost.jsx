import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import Badge from '../common/Badge';
import Button from '../common/Button';
import BlogCover from './BlogCover';
import { useI18n } from '../../i18n/I18nProvider';

// Shift markdown headings down one level: the page title is the only <h1>.
const markdownComponents = {
    h1: ({ node, ...props }) => <h2 {...props} />,
    h2: ({ node, ...props }) => <h2 {...props} />,
    h3: ({ node, ...props }) => <h3 {...props} />,
};

const BlogPost = ({ post }) => {
    const { t, locale } = useI18n();
    if (!post) return null;

    // The markdown repeats the title as its first heading; drop it to avoid a duplicate.
    const content = post.content.replace(/^\s*#\s+[^\n]*\n/, '');

    return (
        <article className="mx-auto max-w-3xl">
            <Link to="/blog" className="mb-10 inline-flex items-center gap-2 text-sm text-brand-200 hover:text-glow">
                <ArrowLeft size={16} /> {t('blog.allArticles')}
            </Link>

            <header className="mb-10">
                {post.category && <Badge variant="accent" className="mb-5">{post.category}</Badge>}
                <h1 className="text-balance text-3xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
                <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-400">
                    {post.author && <span className="flex items-center gap-2"><User size={15} aria-hidden="true" />{post.author}</span>}
                    <span className="flex items-center gap-2"><Calendar size={15} aria-hidden="true" /><time dateTime={post.date}>{formatDate(post.date, locale)}</time></span>
                    {post.readingTime && <span className="flex items-center gap-2"><Clock size={15} aria-hidden="true" />{t('blog.readTime', { time: post.readingTime })}</span>}
                </div>
            </header>

            <BlogCover post={post} className="mb-12 h-56 rounded-3xl border md:h-72" />

            <div className="article text-base md:text-lg">
                <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
            </div>

            {post.tags?.length > 0 && (
                <footer className="mt-14 border-t border-white/10 pt-8">
                    <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{t('blog.tags')}</h2>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                    </div>
                </footer>
            )}

            <aside className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl border border-brand-300/20 bg-gradient-to-br from-brand-500/15 to-ai/10 p-7 md:flex-row md:items-center">
                <div>
                    <p className="font-display text-xl font-semibold text-slate-50">{t('blog.ctaTitle')}</p>
                    <p className="mt-1 text-sm text-slate-400">{t('blog.ctaText')}</p>
                </div>
                <Button href="/#contact" size="sm">{t('nav.book')}</Button>
            </aside>
        </article>
    );
};

export default BlogPost;
