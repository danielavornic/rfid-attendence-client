'use client';

import { usePathname } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

// Map routes to their display titles
const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/live': 'Live Session',
  '/sessions': 'Sessions',
  '/students': 'Students',
  '/analytics': 'Analytics',
};

interface SiteHeaderProps {
  title?: string;
}

export function SiteHeader({ title }: SiteHeaderProps) {
  const pathname = usePathname();

  // Use the provided title if available, otherwise determine from the path
  const displayTitle = title || routeTitles[pathname] || 'Dashboard';

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{displayTitle}</h1>
      </div>
    </header>
  );
}
