'use client';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from './sidebar';
import { SiteHeader } from './site-header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

function PrivateLayout({ children, title, description }: LayoutProps) {
  return (
    <>
      <title>{`${title}`}</title>
      <meta name="description" content={description} />

      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset className="border-none !shadow-none">
          <SiteHeader title={title} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default PrivateLayout;
