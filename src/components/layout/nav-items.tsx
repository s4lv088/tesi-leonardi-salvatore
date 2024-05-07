'use client';

import { MENU_ITEMS, MenuItem } from '@/lib/Constants';
import { NavLink, useMatch } from 'react-router-dom';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface NavItemsProps {
    closeMobileSidebar?: () => void;
}

function MenuItemComponent({
    item,
    className = '',
    onClick,
}: {
    item: MenuItem;
    className?: string;
    onClick?: () => void;
}) {
    const routeParent = useMatch(item.url + '/*');
    const isActiveParent = !!routeParent;

    const route = useMatch(item.url);
    const isActive = !!route;

    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    //Gestisce l'animazione dell'altezza del submenu
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entry) => {
            setHeight(isActiveParent ? entry[0].contentRect.height : 0);
        });
        if (ref?.current) {
            resizeObserver.observe(ref.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, [ref.current, isActiveParent]);

    const Icon = item.icon;

    const handleClickNavLink = () => {
        if ( !item.emptyPage) {
            onClick && onClick();
        }
    };

    return (
        <>
           
                <NavLink
                    to={item.url}
                    onClick={handleClickNavLink}
                    className={clsx(
                        className,
                        `flex items-center px-6 py-4 font-base text-lg w-full transition-transform`,
                       
                    )}
                >
                    {Icon && <Icon className="mr-4 size-6" />}
                    {item.label}
                </NavLink>
                
            
        </>
    );
}

export function NavItems({ closeMobileSidebar }: NavItemsProps) {
    return (
        <nav className="grid items-start">
            {MENU_ITEMS.map((item) => (
                <MenuItemComponent item={item} onClick={closeMobileSidebar} key={item.url} />
            ))}
        </nav>
    );
}
