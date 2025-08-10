'use client';

import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon, VercelIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { type VisibilityType, VisibilitySelector } from './visibility-selector';
import type { Session } from 'next-auth';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  session,
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
                onClick={() => {
                  router.push('/');
                  router.refresh();
                }}
              >
                <PlusIcon />
                <span className="md:sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        </>
      )}

      {!isReadonly && (
        <ModelSelector
          session={session}
          selectedModelId={selectedModelId}
          className="order-1 md:order-2"
        />
      )}

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
          className="order-1 md:order-3"
        />
      )}
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
