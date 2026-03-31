import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OMCODE — Viết code với AI, nhưng kiểm soát thật | Mac-first, Đa Provider, Mã Nguồn Mở',
  description: 'OMCODE là workspace viết code bằng AI cho developer trên Mac. Hỗ trợ nhiều provider, local-first, kiểm soát lệnh an toàn và workflow repo-aware.',
  openGraph: {
    title: 'OMCODE — Viết code với AI, nhưng kiểm soát thật',
    description: 'AI-native coding workspace cho developer trên Mac. Đa provider, local-first, mã nguồn mở.',
    type: 'website',
    url: 'https://code.omdala.com/vi',
    locale: 'vi_VN',
  },
  alternates: {
    canonical: 'https://code.omdala.com/vi',
    languages: { vi: 'https://code.omdala.com/vi', en: 'https://code.omdala.com/en' },
  },
};

export default function HomeVi() {
  return (
    <main>
      <section style={hero}>
        <h1 style={heroTitle}>OMCODE</h1>
        <p style={heroSub}>Viết code với AI, nhưng kiểm soát thật</p>
        <div style={ctaGroup}>
          <a href="/vi/download" style={primaryBtn}>Tải cho Mac</a>
          <a href="https://github.com/tranhatam-collab/CODE.OMDALA.COM" style={secondaryBtn}>Xem mã nguồn</a>
          <a href="https://docs.omdala.com/code" style={secondaryBtn}>Đọc tài liệu</a>
        </div>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Vì sao Mac-first?</h2>
        <p style={sectionText}>Trải nghiệm viết code nhanh nhất bắt đầu từ local. Truy cập filesystem trực tiếp, hiệu năng native, và tích hợp mượt mà với workflow phát triển hiện có của bạn.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Hỗ trợ đa Provider</h2>
        <p style={sectionText}>OpenAI, Anthropic, Cloudflare Workers AI — điều hướng thông minh theo loại tác vụ, chi phí và khả năng. Không bị khóa vào một model duy nhất.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Workflow Local-first</h2>
        <p style={sectionText}>Code của bạn ở trên máy cho đến khi bạn chủ động gửi lên AI. Toàn quyền kiểm soát những gì được chia sẻ, khi nào, và với provider nào.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Quy trình AI có kiểm soát</h2>
        <p style={sectionText}>Không phải chat box. Một workspace thật: mở project, đọc repo, sửa file, chạy lệnh an toàn, review diff, và áp patch có phê duyệt.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Mã nguồn mở</h2>
        <p style={sectionText}>Xây dựng công khai. Clone, chạy, fork và đóng góp. Kiến trúc minh bạch, lộ trình rõ ràng, và phát triển hướng cộng đồng.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Bảo mật & Riêng tư</h2>
        <p style={sectionText}>API key lưu an toàn. Lệnh cần phê duyệt. Dữ liệu nhạy cảm được xóa trước khi gửi lên provider. Nhật ký kiểm toán cho mọi thao tác.</p>
      </section>
      <footer style={footer}>
        <div style={footerLinks}>
          <a href="/vi/features">Tính năng</a>
          <a href="/vi/providers">Providers</a>
          <a href="/vi/download">Tải về</a>
          <a href="/vi/open-source">Mã nguồn mở</a>
          <a href="/vi/security">Bảo mật</a>
          <a href="/vi/changelog">Nhật ký thay đổi</a>
          <a href="https://docs.omdala.com/code">Tài liệu</a>
          <a href="https://github.com/tranhatam-collab/CODE.OMDALA.COM">GitHub</a>
        </div>
        <p style={footerCopy}>© 2026 OMDALA — OMCODE</p>
      </footer>
    </main>
  );
}

const hero: React.CSSProperties = { minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px 24px' };
const heroTitle: React.CSSProperties = { fontSize: '64px', fontWeight: 800, marginBottom: '16px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };
const heroSub: React.CSSProperties = { fontSize: '20px', color: '#8b8ba7', marginBottom: '32px' };
const ctaGroup: React.CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' };
const primaryBtn: React.CSSProperties = { padding: '14px 28px', borderRadius: '10px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '16px', fontWeight: 600, textDecoration: 'none' };
const secondaryBtn: React.CSSProperties = { padding: '14px 28px', borderRadius: '10px', border: '1px solid #4a4a68', background: 'transparent', color: '#e2e8f0', fontSize: '16px', textDecoration: 'none' };
const section: React.CSSProperties = { padding: '64px 24px', maxWidth: '800px', margin: '0 auto' };
const sectionTitle: React.CSSProperties = { fontSize: '28px', fontWeight: 700, marginBottom: '16px' };
const sectionText: React.CSSProperties = { fontSize: '16px', color: '#8b8ba7', lineHeight: 1.7 };
const footer: React.CSSProperties = { padding: '48px 24px', borderTop: '1px solid #2d2d44', textAlign: 'center' };
const footerLinks: React.CSSProperties = { display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' };
const footerCopy: React.CSSProperties = { fontSize: '13px', color: '#4a4a68' };
