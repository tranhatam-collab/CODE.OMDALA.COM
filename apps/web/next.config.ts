/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
  },
};
export default nextConfig;
