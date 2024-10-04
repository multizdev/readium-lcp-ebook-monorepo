import React, { ReactElement } from 'react';

import usePortalStore from '@admin/common/store/usePortalStore';
import Dashboard from '@admin/dashboard/components/stats/Dashboard';
import AddPublication from '@admin/publications/page/AddPublication';
import MainMenu from '@admin/menu/components/MainMenu';
import MainHeader from '@admin/menu/components/MainHeader';

function SelectedItem(): ReactElement {
  const { currentMenuItem } = usePortalStore();

  switch (currentMenuItem) {
    case 'dashboard':
      return <Dashboard />;
    case 'addPublications':
      return <AddPublication />;
    default:
      return (
        <div className="w-full h-full flex justify-center items-center">
          <span>{currentMenuItem}</span>
        </div>
      );
  }
}

function DashboardPage() {
  return (
    <div className="w-full h-screen flex flex-row">
      <MainMenu />
      <div className="w-full flex flex-col">
        <MainHeader />
        <SelectedItem />
      </div>
    </div>
  );
}

export default DashboardPage;
