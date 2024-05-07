import { Outlet } from 'react-router-dom';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { useState } from 'react';

const StandardLayout = () => {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div>
            <Header toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
            <div className="flex overflow-hidden min-h-[calc(100dvh-60px)]">
                <Sidebar sidebarVisible={sidebarVisible} />
                <div className="flex-1 p-6 overflow-auto">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
export default StandardLayout;
