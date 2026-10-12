import React from 'react';
import { Search } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

const BlogSearch = ({ value, onChange, placeholder }) => {
    const { t } = useI18n();
    return (
    <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} aria-hidden="true" />
        <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ?? t('blog.searchPlaceholder')}
            aria-label={t('blog.searchAria')}
            className="input-field rounded-2xl py-3.5 pl-11"
        />
    </div>
    );
};

export default BlogSearch;
