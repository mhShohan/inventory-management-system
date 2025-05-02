'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

interface NavMainPropsTypes {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}

export function NavMain({ items }: NavMainPropsTypes) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((sidebarNavItem) => (
          <Fragment key={sidebarNavItem.title}>
            {(sidebarNavItem.items?.length as number) <= 0 ? (
              <Link href={sidebarNavItem.url} passHref key={sidebarNavItem.title}>
                <SidebarMenuItem className='flex gap-2'>
                  <SidebarMenuButton tooltip={sidebarNavItem.title}>
                    {sidebarNavItem.icon && <sidebarNavItem.icon />}
                    <span>{sidebarNavItem.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ) : (
              <Collapsible
                key={sidebarNavItem.title}
                asChild
                defaultOpen={sidebarNavItem.isActive}
                className='group/collapsible'
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={sidebarNavItem.title}>
                      {sidebarNavItem.icon && <sidebarNavItem.icon />}
                      <span>{sidebarNavItem.title}</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {sidebarNavItem?.items?.map((subItem) => (
                        <Link href={subItem.url} passHref key={subItem.title}>
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </Link>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
          </Fragment>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
