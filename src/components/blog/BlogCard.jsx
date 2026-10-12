import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { formatDateShort } from '../../utils/formatDate';
import SpotlightCard from '../common/SpotlightCard';
import Badge from '../common/Badge';
import BlogCover from './BlogCover';
import { useI18n } from '../../i18n/I18nProvider';

const BlogCard = ({ post }) => {
    const { locale } = useI18n();
    return (
    <SpotlightCard as="article" className="h-full">
        <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
            <BlogCover post={post} className="h-44" />
            <div className="flex flex-1 flex-col p-6">
                {post.category && <Badge variant="accent" className="mb-3 self-start">{post.category}</Badge>}
                <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-brand-100">{post.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-400">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-3">
                        <time dateTime={post.date}>{formatDateShort(post.date, locale)}</time>
                        {post.readingTime && (
                            <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" /> {post.readingTime}</span>
                        )}
                    </span>
                    <ArrowUpRight size={16} className="text-brand-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
            </div>
        </Link>
    </SpotlightCard>
    );
};

export default BlogCard;
