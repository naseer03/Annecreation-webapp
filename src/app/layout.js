import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import {NotistackProvider}  from '@/Provider/NotiStackProvider';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const metadata = {
  title: 'Annie Creations',
  description: '',
  icons: {
    icon: [{ url: '/assets/logo.svg', type: 'image/png', sizes: '32x32' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <NotistackProvider>
          {children}
        </NotistackProvider>
        <Footer />
      </body>
    </html>
  );
}
