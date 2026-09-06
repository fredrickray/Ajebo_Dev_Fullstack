import type { Metadata } from 'next';
import { Sora, Source_Sans_3, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Navbar, Footer } from '@/components';
import { ThemeProvider } from '@/context/ThemeContext';
import { profile } from '@/data/profile';

const display = Sora({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const body = Source_Sans_3({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: `${profile.brand} | Full-stack Engineer`,
  description: profile.tagline,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.brand} | Portfolio`,
    description: profile.tagline,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ajebo-fs-theme');document.documentElement.setAttribute('data-theme',(t==='dark'||t==='light')?t:'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable} ${body.className}`}>
        <ThemeProvider>
          <Navbar />
          <main style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
