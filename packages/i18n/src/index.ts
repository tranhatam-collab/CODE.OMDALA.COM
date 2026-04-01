export type Locale = 'vi' | 'en';
export type TranslationKey = string;
export type TranslationValue = string;
export interface TranslationDict {
  [key: TranslationKey]: TranslationValue;
}
export interface I18nBundle {
  vi: TranslationDict;
  en: TranslationDict;
}

const bundle: I18nBundle = {
  vi: {
    'home.title': 'OMCODE — Viết code với AI, nhưng kiểm soát thật',
    'home.subtitle': 'AI-native coding workspace cho developer trên Mac',
    'cta.download': 'Tải cho Mac',
    'cta.open_app': 'Mở App',
    'cta.github': 'Xem mã nguồn',
    'cta.docs': 'Đọc tài liệu',
    'nav.home': 'Trang chủ',
    'nav.features': 'Tính năng',
    'nav.providers': 'Providers',
    'nav.download': 'Tải về',
    'nav.docs': 'Tài liệu',
    'nav.security': 'Bảo mật',
    'nav.blog': 'Blog',
    'nav.changelog': 'Nhật ký thay đổi',
    'empty.projects': 'Chưa có dự án nào',
    'empty.sessions': 'Chưa có phiên làm việc nào',
    'empty.providers': 'Chưa có provider nào được cấu hình',
    'empty.runs': 'Chưa có lần chạy nào',
    'empty.prompts': 'Chưa có prompt nào',
    'empty.no_activity': 'Chưa có hoạt động gần đây',
    'state.loading': 'Đang tải...',
    'state.error': 'Đã xảy ra lỗi',
    'state.retry': 'Thử lại',
    'state.approve': 'Phê duyệt',
    'state.reject': 'Từ chối',
    'state.apply': 'Áp dụng',
    'state.cancel': 'Hủy',
    'state.save': 'Lưu',
    'state.delete': 'Xóa',
  },
  en: {
    'home.title': 'OMCODE — AI coding with real control',
    'home.subtitle': 'AI-native coding workspace for Mac developers',
    'cta.download': 'Download for Mac',
    'cta.open_app': 'Open App',
    'cta.github': 'View Open Source',
    'cta.docs': 'Read Docs',
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.providers': 'Providers',
    'nav.download': 'Download',
    'nav.docs': 'Docs',
    'nav.security': 'Security',
    'nav.blog': 'Blog',
    'nav.changelog': 'Changelog',
    'empty.projects': 'No projects yet',
    'empty.sessions': 'No sessions yet',
    'empty.providers': 'No providers configured',
    'empty.runs': 'No runs yet',
    'empty.prompts': 'No prompts yet',
    'empty.no_activity': 'No recent activity',
    'state.loading': 'Loading...',
    'state.error': 'An error occurred',
    'state.retry': 'Retry',
    'state.approve': 'Approve',
    'state.reject': 'Reject',
    'state.apply': 'Apply',
    'state.cancel': 'Cancel',
    'state.save': 'Save',
    'state.delete': 'Delete',
  },
};

export function t(key: TranslationKey, locale: Locale = 'vi'): TranslationValue {
  return bundle[locale]?.[key] ?? bundle.en[key] ?? key;
}

export function getBundle(): I18nBundle {
  return bundle;
}
