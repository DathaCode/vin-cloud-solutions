// Dates follow the visitor's language (pass the BCP-47 locale from useI18n().locale).
export const formatDate = (dateString, locale = 'en-US') =>
    new Date(dateString).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

export const formatDateShort = (dateString, locale = 'en-US') =>
    new Date(dateString).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
