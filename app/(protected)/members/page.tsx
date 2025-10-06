import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import MemberDirectory from '../../../components/MemberDirectory';
import { classroomRequest, mapClassroomMembers } from '../../../lib/classroom';
import type { ClassroomMember } from '../../../types';

export default async function MembersPage() {
  const token = cookies().get('classroom_token');
  if (!token) {
    redirect('/login');
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index).sort((a, b) => a - b);
  const defaultYear = years.includes(currentYear) ? currentYear : years[years.length - 1];

  let members: ClassroomMember[] = [];
  try {
    const rawMembers = await classroomRequest<unknown>(`class/${defaultYear}`, {
      method: 'GET',
      token: token?.value
    });
    members = mapClassroomMembers(rawMembers);
  } catch (error) {
    console.error('Members initial load error', error);
  }

  const totalMembers = members.length;
  const yearRange = `${years[0]} – ${years[years.length - 1]}`;

  return (
    <section className="space-y-8">
      <header className="grid gap-6 rounded-3xl border border-sand-800/70 bg-sand-900/40 p-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.45em] text-sand-500">Directory</p>
          <h2 className="text-3xl font-semibold text-white">ค้นหาเพื่อนร่วมรุ่นทั้งหมด</h2>
          <p className="max-w-xl text-sm text-cocoa-300">
            สำรวจข้อมูลการติดต่อและหน่วยงานของเพื่อนในแต่ละรุ่น พร้อมตัวกรองที่จัดวางใหม่ให้เลือกปีและค้นหาได้สะดวกขึ้น
          </p>
        </div>
        <div className="grid gap-3 text-sm text-cocoa-400">
          <div className="rounded-2xl border border-sand-800/80 bg-black/40 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-sand-500">สมาชิกของปี {defaultYear}</p>
            <p className="mt-2 flex items-baseline justify-between text-sand-100">
              <span className="text-2xl font-semibold">{totalMembers}</span>
              <span className="text-xs text-cocoa-400">คน</span>
            </p>
          </div>
          <div className="rounded-2xl border border-sand-800/80 bg-black/40 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.3em] text-sand-500">ช่วงปีในระบบ</p>
            <p className="mt-2 text-sand-100">{yearRange}</p>
          </div>
        </div>
      </header>
      <MemberDirectory initialYear={defaultYear} years={years} initialMembers={members} />
    </section>
  );
}
