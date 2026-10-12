import React from 'react';
import PageLayout from '../components/common/PageLayout';
import Hero from '../components/sections/Hero';
import Partners from '../components/sections/Partners';
import Services from '../components/sections/Services';
import AIInnovation from '../components/sections/AIInnovation';
import PlatformExplorer from '../components/sections/PlatformExplorer';
import Integrations from '../components/sections/Integrations';
import Process from '../components/sections/Process';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import CaseStudies from '../components/sections/CaseStudies';
import BlogTeaser from '../components/sections/BlogTeaser';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';
import CrmTeaser from '../components/sections/CrmTeaser';
import { useSeo } from '../utils/seo';
import { useI18n } from '../i18n/I18nProvider';

const Home = () => {
    const { t } = useI18n();
    useSeo({ title: t('seo.home.title'), description: t('seo.home.description'), path: '/' });

    return (
        <PageLayout>
            <Hero />
            <Partners />
            <Services />
            <AIInnovation />
            <CrmTeaser />
            <PlatformExplorer />
            <CaseStudies />
            <Integrations />
            <Process />
            <WhyChooseUs />
            <BlogTeaser />
            <FAQ />
            <Contact />
        </PageLayout>
    );
};

export default Home;
