import React from 'react';

/**
 * Renders a translated string where **double asterisks** mark emphasized words,
 * so translators can move the bold parts to wherever they belong in their language.
 */
const Rich = ({ text, strongClassName = 'font-medium text-slate-200' }) =>
    String(text)
        .split(/(\*\*[^*]+\*\*)/g)
        .map((part, i) =>
            part.startsWith('**') && part.endsWith('**')
                ? <strong key={i} className={strongClassName}>{part.slice(2, -2)}</strong>
                : <React.Fragment key={i}>{part}</React.Fragment>
        );

export default Rich;
