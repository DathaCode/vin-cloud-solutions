import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '../components/common/PageLayout';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import BlogPost from '../components/blog/BlogPost';
import { useBlogData } from '../hooks/useBlogData';
import { useSeo } from '../utils/seo';
import { SITE_URL } from '../utils/constants';
import { useI18n } from '../i18n/I18nProvider';

const BlogPostPage = () => {
    const { slug } = useParams();
    const { t, lang } = useI18n();
    const { getPostBySlug, loading } = useBlogData();
    const post = getPostBySlug(slug);

    const jsonLd = useMemo(
        () =>
            post && {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: post.title,
                description: post.excerpt,
                datePublished: post.date,
                author: { '@type': 'Organization', name: post.author || 'VIN Cloud Solutions' },
                publisher: {
                    '@type': 'Organization',
                    name: 'VIN Cloud Solutions',
                    logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/vin-logo.png` },
                },
                mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
                keywords: post.tags?.join(', '),
                inLanguage: lang,
            },
        [post, lang]
    );

    useSeo({
        title: post?.title || (loading ? undefined : t('blog.notFoundTitle')),
        description: post?.excerpt,
        keywords: post?.tags?.join(', '),
        path: `/blog/${slug}`,
        type: 'article',
        jsonLd,
    });

    return (
        <PageLayout>
            <Section padding="pt-32 pb-24 md:pt-40">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-b from-brand-500/10 to-transparent" />
                <Container>
                    {post ? (
                        <BlogPost post={post} />
                    ) : (
                        !loading && (
                            <div className="py-20 text-center">
                                <h1 className="text-4xl font-semibold">{t('blog.notFoundTitle')}</h1>
                                <p className="mt-4 text-slate-400">{t('blog.notFoundText')}</p>
                                <Link to="/blog" className="mt-8 inline-block font-semibold text-brand-200 hover:text-glow">
                                    ← {t('blog.backAll')}
                                </Link>
                            </div>
                        )
                    )}
                </Container>
            </Section>
        </PageLayout>
    );
};

export default BlogPostPage;
