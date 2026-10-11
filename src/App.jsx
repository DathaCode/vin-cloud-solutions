import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';
import NotFound from './pages/NotFound';
import CrmSolutions from './pages/CrmSolutions';

/** Scroll to top on navigation, or to the #hash target once it has rendered. */
const ScrollManager = () => {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }
        let tries = 0;
        const id = hash.slice(1);
        const attempt = () => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            else if (tries++ < 20) setTimeout(attempt, 50);
        };
        attempt();
        // `key` changes on every navigation, so repeat clicks on the same #link still scroll.
    }, [pathname, hash, key]);

    return null;
};

function App() {
    return (
        <Router>
            <ScrollManager />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crm-solutions" element={<CrmSolutions />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
