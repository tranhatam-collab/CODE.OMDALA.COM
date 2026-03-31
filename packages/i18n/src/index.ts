export type Locale = 'vi' | 'en';
export type TranslationKey = string;
export type TranslationValue = string;
export interface TranslationDict { [key: TranslationKey]: TranslationValue; }
export interface I18nBundle { vi: TranslationDict; en: TranslationDict; }
export declare function t(key: TranslationKey, locale?: Locale): TranslationValue;
export declare function getBundle(): I18nBundle;
