'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
  const router = useRouter();
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setFormError('ไม่สามารถเข้าสู่ระบบได้');
    }
  };

  const message = formError || error;

  return (
    <form onSubmit={handleSubmit} className="card w-full space-y-8 p-8">
      <div className="space-y-3 text-left">
        <h2 className="text-2xl font-semibold text-white">เข้าสู่ระบบ</h2>
        <p className="text-sm text-cocoa-300">
          เชื่อมต่อกับเพื่อนร่วมรุ่น CIS ด้วยบัญชีมหาวิทยาลัยของคุณ
        </p>
      </div>
      <div className="space-y-3">
        <label
          htmlFor="email"
          className="text-xs font-semibold uppercase tracking-[0.35em] text-sand-500"
        >
          อีเมลมหาวิทยาลัย
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@kkumail.com"
          required
        />
      </div>
      <div className="space-y-3">
        <label
          htmlFor="password"
          className="text-xs font-semibold uppercase tracking-[0.35em] text-sand-500"
        >
          รหัสผ่าน
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      {message && (
        <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {message}
        </p>
      )}
      <div className="space-y-3">
        <button type="submit" className="primary w-full" disabled={loading}>
          {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
        </button>
        <p className="text-center text-xs text-cocoa-400">
          ระบบจะบันทึกการเข้าสู่ระบบล่าสุดเพื่อยืนยันความปลอดภัยของบัญชี
        </p>
      </div>
    </form>
  );
}
