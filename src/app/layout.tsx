
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
      <body className="font-body antialiased selection:bg-accent/30 relative min-h-screen bg-background text-foreground overflow-hidden">
        {/* Apple Intelligence Ambient Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-40 mix-blend-screen">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/30 blur-[100px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/30 blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-pink-500/20 blur-[120px] animate-blob animation-delay-4000" />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
