import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-background">
      <Sidebar />
      <div className="pl-72">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
