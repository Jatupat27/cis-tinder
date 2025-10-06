import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardContent from '../../../components/DashboardContent';
import {
  classroomRequest,
  decodeJwtPayload,
  mapProfileSummary,
  mapStatuses
} from '../../../lib/classroom';
import type { StatusItem } from '../../../types';

export default async function DashboardPage() {
  const token = cookies().get('classroom_token');
  if (!token) {
    redirect('/login');
  }

  let statuses: StatusItem[] = [];
  try {
    const [rawStatuses, profileRaw] = await Promise.all([
      classroomRequest<unknown>('status', {
        method: 'GET',
        token: token?.value
      }),
      classroomRequest<unknown>('profile', {
        method: 'GET',
        token: token?.value
      })
    ]);

    const decoded = decodeJwtPayload<{ id?: string; email?: string }>(token?.value ?? '');
    const profile = mapProfileSummary(profileRaw);
    const identifiers = [profile.id, profile.email, decoded?.id, decoded?.email].filter(Boolean) as string[];

    statuses = mapStatuses(rawStatuses, identifiers);
  } catch (error) {
    console.error('Dashboard status error', error);
  }

  const totalStatuses = statuses.length;
  const likedCount = statuses.filter((item) => item.is_liked).length;

  return (
    <section className="space-y-8">
      <header className="grid gap-6 rounded-3xl border border-sand-800/70 bg-sand-900/40 p-6 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-start">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.45em] text-sand-500">Dashboard</p>
          <h2 className="text-3xl font-semibold text-white">บันทึกความเคลื่อนไหวล่าสุด</h2>
          <p className="max-w-xl text-sm text-cocoa-300">
            สำรวจเรื่องราวที่เพื่อน ๆ แชร์ไว้ ไลค์สถานะที่ถูกใจ และร่วมสนทนาได้ทันทีทั้งหมดในมุมมองใหม่โทนขาวดำ
          </p>
        </div>
        <div className="grid gap-3 text-sm text-cocoa-400">
          <div className="rounded-2xl border border-sand-800/80 bg-black/40 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-sand-500">รวมอัปเดต</p>
            <p className="mt-2 flex items-baseline justify-between text-sand-100">
              <span className="text-2xl font-semibold">{totalStatuses}</span>
              <span className="text-xs text-cocoa-400">รายการ</span>
            </p>
          </div>
          <div className="rounded-2xl border border-sand-800/80 bg-black/40 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-sand-500">คุณถูกใจ</p>
            <p className="mt-2 flex items-baseline justify-between text-sand-100">
              <span className="text-2xl font-semibold">{likedCount}</span>
              <span className="text-xs text-cocoa-400">สถานะ</span>
            </p>
          </div>
        </div>
      </header>
      <DashboardContent initialStatuses={statuses} />
    </section>
  );
}
