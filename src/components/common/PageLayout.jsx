import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { useI18n } from '../../i18n/I18nProvider';

const PageLayout = ({ children, className = '' }) => {
    const { t } = useI18n();
    return (
    <div className={`flex min-h-screen flex-col ${className}`}>
        <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-300 focus:px-4 focus:py-2 focus:text-ink-950"
        >
            {t('common.skip')}
        </a>
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
    </div>
    );
};

export default PageLayout;
