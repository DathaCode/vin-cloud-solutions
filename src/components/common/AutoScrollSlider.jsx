import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Hand, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

const RESUME_AFTER_MS = 2500;
const DRAG_THRESHOLD = 6;

/**
 * Horizontal slider that drifts slowly to the left in an endless loop.
 * Pauses on hover, keyboard focus, drag/swipe, when off-screen or the tab is hidden, and when `paused` is set;
 * resumes shortly after the visitor stops interacting. Arrow buttons, ←/→ keys, mouse drag, touch swipe,
 * a pause/play toggle and a progress counter are built in. Reduced-motion users start paused.
 * `renderItem(item, { clone })`: loop clones must set tabIndex={-1} on their focusable elements.
 */
const AutoScrollSlider = ({ items, getKey, renderItem, label, speed = 32, paused = false, itemClassName = '' }) => {
    const reduceMotion = useReducedMotion();
    const track = useRef(null);
    const pos = useRef(0);               // float scroll position (scrollLeft rounds on some displays)
    const setWidth = useRef(0);          // width of one full set of items incl. trailing gap
    const step = useRef(0);              // one card + gap
    const lastInteraction = useRef(0);
    const hovering = useRef(false);
    const focused = useRef(false);
    const drag = useRef(null);
    const inView = useRef(true);
    const progressBar = useRef(null);
    const counter = useRef(null);

    const [canLoop, setCanLoop] = useState(false);
    const [userPaused, setUserPaused] = useState(Boolean(reduceMotion));
    const [dragging, setDragging] = useState(false);

    const n = items.length;

    // useReducedMotion can resolve after the first render.
    useEffect(() => { if (reduceMotion) setUserPaused(true); }, [reduceMotion]);

    // Measure: loop (and duplicate items) only when one set is wider than the viewport.
    const measure = useCallback(() => {
        const el = track.current;
        if (!el) return;
        const cards = el.querySelectorAll('[data-slide]');
        if (!cards.length) return;
        const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
        step.current = cards[0].getBoundingClientRect().width + gap;
        const oneSet = step.current * n;
        setWidth.current = oneSet;
        setCanLoop(oneSet - gap > el.clientWidth + 1);
    }, [n]);

    useLayoutEffect(() => {
        measure();
        const ro = new ResizeObserver(measure);
        if (track.current) ro.observe(track.current);
        return () => ro.disconnect();
    }, [measure]);

    // Start from the beginning whenever the item set changes.
    useEffect(() => {
        pos.current = 0;
        if (track.current) track.current.scrollLeft = 0;
    }, [items]);

    const updateIndicators = useCallback(() => {
        if (!setWidth.current || !step.current) return;
        const within = ((pos.current % setWidth.current) + setWidth.current) % setWidth.current;
        if (progressBar.current) progressBar.current.style.transform = `scaleX(${Math.max(0.04, (within + step.current) / setWidth.current)})`;
        if (counter.current) {
            const index = (Math.round(within / step.current) % n) + 1;
            counter.current.textContent = `${String(index).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
        }
    }, [n]);

    // Keep the float position inside the first copy so the loop is seamless.
    const wrap = useCallback(() => {
        const el = track.current;
        if (!el || !canLoop || !setWidth.current) return;
        if (pos.current >= setWidth.current) pos.current -= setWidth.current;
        else if (pos.current < 0) pos.current += setWidth.current;
        el.scrollLeft = pos.current;
    }, [canLoop]);

    const markInteraction = () => { lastInteraction.current = performance.now(); };

    // Pause while off-screen or when the tab is hidden.
    useEffect(() => {
        const el = track.current;
        if (!el) return undefined;
        const io = new IntersectionObserver(([entry]) => { inView.current = entry.isIntersecting; });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Drift loop.
    useEffect(() => {
        let frame;
        let last = performance.now();
        const tick = (now) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            const el = track.current;
            const idle = now - lastInteraction.current > RESUME_AFTER_MS;
            const running = el && canLoop && !userPaused && !paused && !hovering.current && !focused.current
                && !drag.current && idle && inView.current && !document.hidden;
            if (running) {
                pos.current += speed * dt;
                wrap();
                updateIndicators();
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [canLoop, userPaused, paused, speed, wrap, updateIndicators]);

    // Native scrolling (touch swipe, trackpad, smooth arrow scroll) keeps our position in sync.
    const onScroll = () => {
        const el = track.current;
        if (!el) return;
        if (Math.abs(el.scrollLeft - pos.current) > 1) {
            pos.current = el.scrollLeft;
            if (canLoop && (pos.current >= setWidth.current || pos.current < 0)) wrap();
            markInteraction();
        }
        updateIndicators();
    };

    const go = (dir) => {
        const el = track.current;
        if (!el || !step.current) return;
        markInteraction();
        if (canLoop) {
            // Jump to the equivalent spot in the other copy first, so we never run out of room.
            if (dir > 0 && pos.current + step.current > setWidth.current) pos.current -= setWidth.current;
            if (dir < 0 && pos.current - step.current < 0) pos.current += setWidth.current;
            el.scrollLeft = pos.current;
        }
        const target = Math.round(pos.current / step.current + dir) * step.current;
        el.scrollTo({ left: target, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    // Mouse drag (touch uses native swipe).
    const onPointerDown = (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        drag.current = { startX: e.clientX, startPos: track.current.scrollLeft, moved: false };
    };
    const onPointerMove = (e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.startX;
        if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
            d.moved = true;
            setDragging(true);
            track.current.setPointerCapture?.(e.pointerId);
        }
        if (d.moved) {
            pos.current = d.startPos - dx;
            wrap();
            if (!canLoop) track.current.scrollLeft = pos.current;
            updateIndicators();
        }
    };
    const endDrag = () => {
        if (drag.current?.moved) {
            markInteraction();
            // Let the click that ends a drag be swallowed by onClickCapture, then reset.
            setTimeout(() => { drag.current = null; }, 0);
        } else {
            drag.current = null;
        }
        setDragging(false);
    };
    const onClickCapture = (e) => {
        if (drag.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };

    const autoplayOn = canLoop && !userPaused && !paused;
    const rendered = canLoop ? [...items, ...items] : items;

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            onMouseEnter={() => { hovering.current = true; }}
            onMouseLeave={() => { hovering.current = false; markInteraction(); }}
            // Only keyboard focus pauses; a mouse click focusing the track shouldn't freeze it.
            onFocus={(e) => { if (e.target.matches(':focus-visible')) focused.current = true; }}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) { focused.current = false; markInteraction(); } }}
        >
            <div
                ref={track}
                tabIndex={0}
                onScroll={onScroll}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onClickCapture={onClickCapture}
                onWheel={(e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) markInteraction(); }}
                aria-label={`${label}. Use the left and right arrow keys to browse.`}
                className={`mask-fade-x -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 pt-1 [scrollbar-width:none] focus-visible:ring-offset-0 [&::-webkit-scrollbar]:hidden ${
                    canLoop ? (dragging ? 'cursor-grabbing select-none' : 'cursor-grab') : ''
                }`}
            >
                {rendered.map((item, i) => {
                    const clone = i >= n;
                    return (
                        <div
                            key={`${getKey(item)}${clone ? '-clone' : ''}`}
                            data-slide={clone ? undefined : ''}
                            role={clone ? undefined : 'group'}
                            aria-roledescription={clone ? undefined : 'slide'}
                            aria-label={clone ? undefined : `${i + 1} of ${n}`}
                            // Clones stay clickable for mouse/touch users but are hidden from screen readers;
                            // renderItem receives { clone } so it can drop them from the tab order.
                            aria-hidden={clone || undefined}
                            className={`shrink-0 ${itemClassName}`}
                        >
                            {renderItem(item, { clone })}
                        </div>
                    );
                })}
            </div>

            {canLoop && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <span ref={counter} className="w-16 font-mono text-xs tabular-nums text-slate-400" aria-hidden="true">
                            01 / {String(n).padStart(2, '0')}
                        </span>
                        <span className="h-1 w-32 overflow-hidden rounded-full bg-white/10 sm:w-48" aria-hidden="true">
                            <span ref={progressBar} className="block h-full origin-left rounded-full bg-gradient-to-r from-brand-300 to-glow" style={{ transform: `scaleX(${1 / n})` }} />
                        </span>
                        <span className="hidden items-center gap-1.5 font-mono text-[11px] text-slate-500 md:flex">
                            <Hand size={12} aria-hidden="true" /> drag, swipe or hover to pause
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setUserPaused((p) => !p)}
                            aria-pressed={!autoplayOn}
                            aria-label={autoplayOn ? 'Pause automatic sliding' : 'Play automatic sliding'}
                            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-slate-200 transition-colors hover:border-brand-300/50 hover:text-glow"
                        >
                            {autoplayOn ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        {[[-1, ArrowLeft, 'Previous case study'], [1, ArrowRight, 'Next case study']].map(([dir, Arrow, text]) => (
                            <button
                                key={text}
                                type="button"
                                onClick={() => go(dir)}
                                aria-label={text}
                                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-slate-200 transition-colors hover:border-brand-300/50 hover:text-glow"
                            >
                                <Arrow size={18} />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AutoScrollSlider;
