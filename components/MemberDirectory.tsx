'use client';

import { useMemo, useState } from 'react';
import MemberCard from './MemberCard';
import type { ClassroomMember } from '../types';

interface MemberDirectoryProps {
  initialYear: number;
  years: number[];
  initialMembers: ClassroomMember[];
}

export default function MemberDirectory({ initialYear, years, initialMembers }: MemberDirectoryProps) {
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [members, setMembers] = useState<ClassroomMember[]>(Array.isArray(initialMembers) ? initialMembers : []);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleYearChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/class/${year}`);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message ?? 'ไม่สามารถดึงรายชื่อได้');
      }
      const data = await response.json();
      const list = Array.isArray(data?.members) ? (data.members as ClassroomMember[]) : [];
      setMembers(list);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = useMemo(() => {
    if (!keyword.trim()) return members;
    const lower = keyword.trim().toLowerCase();
    return members.filter((member) =>
      [member.full_name, member.email, member.student_id]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(lower))
    );
  }, [keyword, members]);

  return (
    <div className="space-y-8">
      <div className="card space-y-6 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-sand-500">Class Year</p>
            <h2 className="text-2xl font-semibold text-white">รุ่น {selectedYear}</h2>
            <p className="text-sm text-cocoa-300">ค้นหาเพื่อนร่วมรุ่นตามชื่อ อีเมล หรือรหัสนักศึกษา</p>
          </div>
          <div className="rounded-2xl border border-sand-800/60 bg-black/40 px-4 py-3 text-sm text-sand-100">
            <p className="text-xs uppercase tracking-[0.3em] text-sand-500">จำนวนที่พบ</p>
            <p className="text-lg font-semibold">{filteredMembers.length}</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-center">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-500">
              ค้นหาในรุ่นนี้
            </label>
            <input
              type="search"
              placeholder="พิมพ์ชื่อ อีเมล หรือรหัสนักศึกษา"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <div className="space-y-2 sm:justify-self-end">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-500">
              เลือกรุ่น
            </label>
            <select value={selectedYear} onChange={handleYearChange} className="min-w-[160px]">
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {error && (
        <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      {loading ? (
        <p className="text-sm text-cocoa-300">กำลังโหลดรายชื่อ...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
          {!filteredMembers.length && (
            <p className="col-span-full rounded-3xl border border-dashed border-sand-800/70 bg-black/40 py-12 text-center text-sm text-cocoa-400">
              ไม่มีสมาชิกที่ตรงกับคำค้นหา
            </p>
          )}
        </div>
      )}
    </div>
  );
}
