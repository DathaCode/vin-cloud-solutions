import React from 'react';
import BlogCard from './BlogCard';
import Reveal from '../common/Reveal';
import { useI18n } from '../../i18n/I18nProvider';

const BlogList = ({ posts }) => {
    const { t } = useI18n();
    if (!posts || posts.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
                <p className="text-slate-400">{t('blog.none')}</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.06}>
                    <BlogCard post={post} />
                </Reveal>
            ))}
        </div>
    );
};

export default BlogList;
