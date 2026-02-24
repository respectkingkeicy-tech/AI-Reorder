
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '하림이 바보 | Precision Fashion Planning',
  description: 'AI-Powered Fashion Quantity Design and Stock Level Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent/30">
        {children}
      </body>
    </html>
  );
}
