import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Car } from 'lucide-react';
// import AppLogo from './app-logo';
// import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';

const mainNavItems: NavItem[] = [
    {
        title: 'Мої машини',
        href: '/dashboard',
        icon: Car,
    },
];

/*const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];*/

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            {/*<Link href={route('cars.index')}>*/}
                            {/*    <p className="mx-auto text-[1.25rem]">AutoMria</p>*/}
                            {/*</Link>*/}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/*<NavFooter items={footerNavItems} className="mt-auto" />*/}
                <NavUser />
                <div className="flex flex-wrap items-center gap-2 p-4">
                    <SidebarTrigger className="-ml-1" />
                    <p>Бокова панель</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
