import { cn } from '@/lib/utils';
import { NavItems } from './layout/nav-items';

type SidebarProps = {
    sidebarVisible: boolean;
};

export function Sidebar({ sidebarVisible }: SidebarProps) {
    return (
        <div
            className={cn(
                'relative h-auto border-r transition-all duration-200 overflow-hidden hidden lg:block',
                sidebarVisible ? 'w-64 min-w-64' : 'w-0 min-w-0'
            )}
        >
            <div className="space-y-1">
                <NavItems />
            </div>
        </div>
    );
}
