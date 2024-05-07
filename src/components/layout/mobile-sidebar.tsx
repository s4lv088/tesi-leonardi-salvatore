'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { NavItems } from './nav-items';

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon size={32} />
                </SheetTrigger>
                <SheetContent side="left" className="!px-0 ">
                    <div className="space-y-4 py-4">
                        <div className="py-2">
                            <div className="space-y-1">
                                <NavItems closeMobileSidebar={() => setOpen(false)} />
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
