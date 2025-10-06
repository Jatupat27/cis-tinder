import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Classroom Lab Portal',
  description: 'Classroom community portal with status updates and member directory.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="h-full bg-black">
      <body className="relative min-h-screen bg-transparent text-sand-50 selection:bg-white/20 selection:text-white">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_35%,rgba(255,255,255,0.08)_100%)] mix-blend-screen opacity-80" />
        </div>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]" />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
