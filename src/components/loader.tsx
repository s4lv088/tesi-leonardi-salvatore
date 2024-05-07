import { cn } from '@/lib/utils';
import { Icons } from '../components/ui/icons';

type LoaderProps = {
    loaderActive: boolean;
    className?: string;
};
export function Loader({ loaderActive, className }: LoaderProps) {
    return loaderActive ? (
        <div className={cn('bg-slate-200 z-10 opacity-80 fixed bottom-0 left-0 top-0 right-0 flex', className)}>
            <div className="m-auto text-center">
                <Icons.spinner className="mr-2 h-16 w-16 animate-spin z-20 " color="#020817" />
            </div>
        </div>
    ) : null;
}
