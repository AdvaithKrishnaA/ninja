'use client';

import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/components/icons';
import { SidebarHistory } from '@/components/sidebar-history';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <Link
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
              className="flex flex-row gap-2 items-center hover:bg-muted"
            >
              <div className="flex items-center">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 340 340" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground"
                >
                  <path 
                    d="M335.273 125.652L205.042 158.079M125.543 3.26639L157.97 135.066M4.72638 214.042L132.342 179.523M214.456 335.382L183.598 208.289M221.344 199.619L215.135 338.32L140.407 221.306L1.70584 215.097L118.72 140.369L124.929 1.66757L199.657 118.682L338.358 124.891L221.344 199.619ZM193.88 172.699C193.881 175.419 193.346 178.112 192.305 180.625C191.265 183.138 189.739 185.422 187.816 187.345C185.893 189.269 183.609 190.795 181.096 191.836C178.584 192.877 175.89 193.413 173.17 193.413C170.45 193.413 167.757 192.877 165.244 191.836C162.731 190.795 160.447 189.269 158.524 187.345C156.601 185.422 155.076 183.138 154.035 180.625C152.995 178.112 152.459 175.419 152.46 172.699C152.459 169.979 152.995 167.285 154.035 164.772C155.076 162.259 156.601 159.975 158.524 158.052C160.447 156.128 162.731 154.602 165.244 153.561C167.757 152.52 170.45 151.984 173.17 151.984C175.89 151.984 178.584 152.52 181.096 153.561C183.609 154.602 185.893 156.128 187.816 158.052C189.739 159.975 191.265 162.259 192.305 164.772C193.346 167.285 193.881 169.979 193.88 172.699Z" 
                    fill="currentColor"
                    stroke="hsl(var(--background))"
                  />
                </svg>
                <span className="text-lg font-semibold px-1 rounded-md cursor-pointer">
                  Agent
                </span>
              </div>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className="p-2 h-fit"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push('/');
                    router.refresh();
                  }}
                >
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end">New Chat</TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHistory user={user} />
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
