import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from '../../../components/LoginForm';

export default function LoginPage() {
  if (cookies().get('classroom_token')) {
    redirect('/dashboard');
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>
      <div className="container-responsive flex flex-1 items-center py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.45em] text-sand-500">Classroom Lab</p>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">ศูนย์กลางอัปเดตของเพื่อนทุกชั้นปี</h1>
              <p className="max-w-xl text-sm text-cocoa-300">
                เชื่อมต่อกับเพื่อนร่วมรุ่น อัปเดตสถานะ และค้นหาข้อมูลเพื่อน ๆ ในเครือข่าย CIS ด้วยดีไซน์ใหม่โทนขาวดำสุดเรียบเท่
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-sand-800/70 bg-sand-900/40 p-5">
                <p className="text-sm font-semibold text-white">รีแคปสถานะ</p>
                <p className="mt-2 text-xs text-cocoa-400">ติดตามสิ่งที่เพื่อน ๆ กำลังสนใจแบบเรียลไทม์</p>
              </div>
              <div className="rounded-3xl border border-sand-800/70 bg-sand-900/40 p-5">
                <p className="text-sm font-semibold text-white">ค้นหาสมาชิก</p>
                <p className="mt-2 text-xs text-cocoa-400">ค้นหาเพื่อนร่วมรุ่นด้วยชื่อ รหัส หรือที่ทำงาน</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
