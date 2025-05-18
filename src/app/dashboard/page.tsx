'use client';

import { Construction } from 'lucide-react';

import PrivateLayout from '@/layouts/private';

export default function DashboardPage() {
  return (
    <PrivateLayout title="Dashboard">
      <div className="flex flex-col items-center justify-center">
        <Construction className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-2xl font-semibold">Dashboard Under Construction</h2>
      </div>
    </PrivateLayout>
  );
}
