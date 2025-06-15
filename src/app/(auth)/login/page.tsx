'use client';

import LoginForm from '@/app/(auth)/login/components/form';

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-primary/5 via-background to-background p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.15] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="absolute -left-[5%] top-[10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -right-[10%] top-[40%] h-[500px] w-[700px] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
