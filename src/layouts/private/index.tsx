'use client';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { SiteHeader } from './side-header';
import { AppSidebar } from './sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

// todo: add sidebar etc
function PrivateLayout({ children, title, description }: LayoutProps) {
  return (
    <>
      <title>{`${title}`}</title>
      <meta name="description" content={description} />

      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset className="border-none !shadow-none">
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default PrivateLayout;
