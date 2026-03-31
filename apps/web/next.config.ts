/** @type {import('next').NextConfig} */
const nextConfig = {
  // Thay standalone thành export cho public web tĩnh
  output: 'export',
  // Bỏ i18n vì App Router không hỗ trợ i18n trong file config như Page Router (đã handle qua thư mục /vi/ và /en/)
  // Tắt optimize image tĩnh của NextJS vì Cloudflare Pages static site không hỗ trợ mặc định
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
