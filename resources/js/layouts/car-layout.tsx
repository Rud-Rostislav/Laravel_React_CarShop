import AppearanceToggleIcon from '@/components/ui/AppearanceToggleIcon';
import { ArchiveBoxIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface CarLayoutProps {
    children: ReactNode;
}

const colors = {
    blue: 'rgb(0,124,255, 0.5)',
    white: 'rgba(255,255,255, 0.5)',
    black: 'rgba(0,0,0,0.91)',
} as const;

export default function CarLayout({ children }: CarLayoutProps) {
    return (
        <>
            <div className="pointer-events-none fixed top-0 left-0 z-0 h-screen w-full overflow-hidden">
                <div
                    className="breathing-gradient absolute top-1/2 left-1/2 opacity-80 blur-3xl"
                    style={{
                        width: '150vw',
                        height: '100vh',
                        background: `radial-gradient(circle at center,
        ${colors.blue} 0%,
        ${colors.white} 50%,
        ${colors.black} 100%)`,
                    }}
                />
            </div>

            <div className="fixed top-0 z-50 w-full pt-[2vh]">
                <header className="mx-auto flex h-[5vh] w-1/4 items-center justify-center gap-6 rounded-3xl bg-black/25 px-6 py-2 shadow-lg backdrop-blur-sm transition-colors max-[1000px]:w-1/2 max-[600px]:w-3/4 max-[400px]:w-4/5 dark:bg-black/25">
                    <Link href={route('cars.index')} className="transition-colors hover:text-neutral-400">
                        <HomeIcon className="h-6 w-6" />
                    </Link>
                    <Link href={route('cars.create')} className="transition-colors hover:text-neutral-400">
                        <PlusCircleIcon className="h-6 w-6" />
                    </Link>
                    <Link href={route('dashboard')} className="transition-colors hover:text-neutral-400">
                        <ArchiveBoxIcon className="h-6 w-6" />
                    </Link>
                    <AppearanceToggleIcon />
                </header>
            </div>

            <main className="relative z-10 min-h-[95vh] overflow-auto p-5 pt-[7vh]">{children}</main>

            <footer className="relative z-10 flex h-[5vh] items-center justify-center bg-black/25 px-6 text-center text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-colors dark:bg-black/25">
                AutoMria 2025
            </footer>
        </>
    );
}
