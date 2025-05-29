import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';

export default function AppearanceToggleIcon() {
    const { appearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        const next = appearance === 'dark' ? 'light' : 'dark';
        updateAppearance(next);
    };

    const Icon = appearance === 'dark' ? Sun : Moon;

    return (
        <button
            onClick={toggleTheme}
            className="rounded-md p-1.5 transition-colors"
            title={`Змінити тему на ${appearance === 'dark' ? 'світлу' : 'темну'}`}
        >
            <Icon
                className="h-6 w-6 text-black dark:text-white transition-colors duration-300"
            />
        </button>
    );
}
