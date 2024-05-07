import { cn } from '@/lib/utils';
import imgLogo from '../assets/react.svg';
import { Menu, X } from 'lucide-react';
import { MobileSidebar } from './layout/mobile-sidebar';

type HeaderProps = {
    toggleSidebar: () => void;
    sidebarVisible: boolean;
};
export function Header({ toggleSidebar, sidebarVisible }: HeaderProps) {
  

    return (
        <div className="flex items-center justify-between border-b py-1 h-[60px]">
            <div className="flex gap-4 ml-4 items-center">
                <div className={cn('block lg:!hidden')}>{<MobileSidebar />}</div>
                <X
                    size={32}
                    onClick={toggleSidebar}
                    className={cn(
                        'rotate-90 scale-100 transition-all duration-200 cursor-pointer from-gray-800 dark:from-gray-100',
                        !sidebarVisible && ' -rotate-90 scale-0',
                        'hidden lg:block'
                    )}
                />
                <Menu
                    size={32}
                    onClick={toggleSidebar}
                    className={cn(
                        'rotate-360 absolute scale-100 transition-all duration-200 cursor-pointer from-gray-800 dark:from-gray-100',
                        sidebarVisible && ' rotate-0 scale-0',
                        'hidden lg:block'
                    )}
                />
            </div>
        </div>
    );
}
