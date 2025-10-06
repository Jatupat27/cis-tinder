import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '../../components/LogoutButton';
import { classroomRequest } from '../../lib/classroom';
import type { ProfileSummary } from '../../types';

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('classroom_token');
  if (!token) {
    redirect('/login');
  }

  let profile: ProfileSummary | null = null;
  try {
    profile = await classroomRequest<ProfileSummary>('profile', {
      method: 'GET',
      token: token?.value
    });
  } catch (error) {
    console.error('Protected layout profile error', error);
    redirect('/login');
  }

  const navigation = [
    { href: '/dashboard', label: 'ฟีดล่าสุด' },
    { href: '/members', label: 'รายชื่อเพื่อน' }
  ];

  return (
    <div className="relative isolate min-h-screen pb-16 pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_55%)]" />
      </div>
      <div className="container-responsive">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="card sticky top-10 hidden h-fit max-h-[calc(100vh-6rem)] flex-col justify-between p-6 lg:flex">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.45em] text-sand-500">Classroom</p>
                <h1 className="text-2xl font-semibold text-white">Lab Portal</h1>
                <p className="text-sm text-cocoa-300">สวัสดี {profile?.full_name ?? 'เพื่อน'} 👋</p>
              </div>
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-sand-900/40 px-4 py-3 text-sm font-medium text-sand-100 transition hover:border-sand-700 hover:bg-sand-900/70"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-cocoa-400">เปิด</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-sand-800/70 bg-sand-900/40 px-4 py-3 text-sm text-cocoa-300">
                <p className="font-medium text-sand-100">ข้อมูลผู้ใช้</p>
                <p>{profile?.email}</p>
              </div>
              <LogoutButton />
            </div>
          </aside>
          <div className="space-y-6">
            <div className="card flex flex-col gap-6 p-6 lg:hidden">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-sand-500">Classroom</p>
                <div>
                  <h2 className="text-2xl font-semibold text-white">Lab Portal</h2>
                  <p className="text-sm text-cocoa-300">สวัสดี {profile?.full_name ?? 'เพื่อน'} 👋</p>
                </div>
              </div>
              <nav className="grid gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-sand-800/70 bg-sand-900/40 px-4 py-3 text-sm font-medium text-sand-100 transition hover:border-sand-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <LogoutButton />
            </div>
            <main className="space-y-10 rounded-[2.5rem] border border-sand-800/70 bg-black/30 p-6 sm:p-8">
              <div className="hr-subtle" />
              <div className="space-y-10">{children}</div>
              <div className="hr-subtle" />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
