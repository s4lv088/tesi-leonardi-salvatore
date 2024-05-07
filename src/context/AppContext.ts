import { createContext, useContext } from 'react';

type AppContextType = {
    loader: {
        show: () => void;
        hide: () => void;
    };
};

const defaultContext = {
   
    loader: {
        show: () => ({}),
        hide: () => ({}),
    },
};
const AppContext = createContext<AppContextType>(defaultContext);

function useAppContext() {
    return useContext(AppContext);
}

function useLoader() {
    const { loader } = useContext(AppContext);
    return loader;
}
export { useAppContext, useLoader };

export default AppContext;
