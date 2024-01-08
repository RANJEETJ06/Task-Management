import React, { ReactNode } from 'react';
import TopBar from './TopBar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC <LayoutProps>= ({ children }) => {
  return (
    <div>
      <TopBar title="Task Management System" />
      <div className="flex justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
