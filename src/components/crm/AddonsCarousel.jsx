import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';
import Icon from '../common/Icon';

/** Horizontally scrolling add-on cards with arrow controls and a progress bar (swipe works natively on touch). */
const AddonsCarousel = ({ items }) => {
    const track = useRef(null);
    const [progress, setProgress] = useState(0);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const update = useCallback(() => {
        const el = track.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setProgress(max > 0 ? el.scrollLeft / max : 1);
        setAtStart(el.scrollLeft <= 4);
        setAtEnd(el.scrollLeft >= max - 4);
    }, []);

    useEffect(() => {
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [update]);

    const scrollByCard = (dir) => {
        const el = track.current;
        const card = el?.querySelector('[data-card]');
        if (!el || !card) return;
        el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: 'smooth' });
    };

    const visibleShare = track.current ? track.current.clientWidth / track.current.scrollWidth : 0.4;

    return (
        <div>
            <div className="mb-6 flex justify-end gap-2">
                {[[-1, ArrowLeft, 'Previous add-ons', atStart], [1, ArrowRight, 'Next add-ons', atEnd]].map(([dir, Arrow, label, disabled]) => (
                    <button
                        key={label}
                        type="button"
                        onClick={() => scrollByCard(dir)}
                        disabled={disabled}
                        aria-label={label}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-slate-200 transition-colors hover:border-brand-300/50 hover:text-glow disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <Arrow size={18} />
                    </button>
                ))}
            </div>

            <ul
                ref={track}
                onScroll={update}
                aria-label="Available CRM add-ons"
                style={{ maskImage: `linear-gradient(to right, ${atStart ? 'black' : 'transparent'}, black 8%, black 92%, ${atEnd ? 'black' : 'transparent'})` }}
                className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {items.map((a) => (
                    <li
                        key={a.title}
                        data-card
                        className="w-[78%] shrink-0 snap-start rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 transition-colors hover:border-brand-300/30 sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
                    >
                        <div className="flex items-center justify-between">
                            <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                                <Icon name={a.icon} size={20} />
                            </span>
                            <Badge variant="accent">+ Add-on</Badge>
                        </div>
                        <h3 className="mt-5 text-lg font-semibold">{a.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.description}</p>
                    </li>
                ))}
            </ul>

            <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-300 to-glow transition-[margin] duration-200"
                    style={{ width: `${Math.max(visibleShare, 0.15) * 100}%`, marginLeft: `${progress * (1 - Math.max(visibleShare, 0.15)) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default AddonsCarousel;
