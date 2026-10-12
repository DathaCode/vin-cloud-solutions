import React from 'react';

// Posts don't ship cover images yet, so render a generated, category-tinted cover.
const TINTS = {
    Atlassian: ['#4C8DFF', '#1A4F62'],
    'Cloud Infrastructure': ['#FF9900', '#12394A'],
    'Best Practices': ['#67E8F9', '#1A4F62'],
};

const BlogCover = ({ post, className = '' }) => {
    const [a, b] = TINTS[post.baseCategory || post.category] || ['#7CC4DA', '#12394A'];

    return (
        <div
            aria-hidden="true"
            className={`relative overflow-hidden border-b border-white/5 ${className}`}
            style={{ background: `radial-gradient(circle at 80% 20%, ${a}40, transparent 55%), linear-gradient(135deg, ${b}, #070D16)` }}
        >
            <div className="absolute inset-0 bg-grid opacity-60" />
            <img src="/brand/vin-mark.png" alt="" className="absolute -right-6 top-1/2 h-[140%] w-auto -translate-y-1/2 opacity-[0.07] grayscale" />
            <div className="absolute bottom-4 left-5 flex gap-1.5">
                {(post.tags || []).slice(0, 3).map((t) => (
                    <span key={t} className="rounded-md bg-black/30 px-2 py-0.5 font-mono text-[10px] text-slate-300 backdrop-blur">#{t}</span>
                ))}
            </div>
        </div>
    );
};

export default BlogCover;
