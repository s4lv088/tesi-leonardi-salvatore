import AppContext from '@/context/AppContext';
import { cn } from '@/lib/utils';
import React, { startTransition, useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { Loader } from '../../components/loader';
import { Toaster } from '../ui/toaster';

type MainStructureProps = {
    children: React.ReactNode;
};

const MainStructure = ({ children }: MainStructureProps) => {
    const { pathname } = useLocation();
    const [loaderActive, setLoaderActive] = useState<boolean>(false);
const navigate=useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

   

    const appContextValue = {
        loader: {
            show: () => {
                startTransition(() => {
                    setLoaderActive(true);
                });
            },
            hide: () => {
                startTransition(() => {
                    setLoaderActive(false);
                });
            },
        },
    };

  
    return (
        <div className={cn('App')}>
            <AppContext.Provider value={appContextValue}>
                {' '}
                {<Loader loaderActive={loaderActive} />}
                {children}
            </AppContext.Provider>
            <Toaster />
        </div>
    );
};

export default MainStructure;
