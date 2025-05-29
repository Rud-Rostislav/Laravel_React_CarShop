import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            {/*<SidebarGroupLabel>Platform</SidebarGroupLabel>*/}
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title} className="flex items-center">
                        <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
                            <Link
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', width: '100%' }}
                                href={item.href}
                                prefetch
                                className="flex items-center justify-center gap-2 py-6"
                            >
                                {item.icon && <item.icon className="scale-125" />}
                                <span className="text-[1.2rem]">{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
