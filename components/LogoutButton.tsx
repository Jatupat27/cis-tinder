'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await logout();
      router.push('/login');
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="ghost w-full justify-center px-5 py-2.5 text-sand-100 hover:text-white"
      disabled={pending}
    >
      {pending ? 'ออกจากระบบ...' : 'ออกจากระบบ'}
    </button>
  );
}
