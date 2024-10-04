import React, { ReactElement } from 'react';

import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import { PiMoney } from 'react-icons/pi';
import { BiBookContent } from 'react-icons/bi';
import { TbLogs } from 'react-icons/tb';
import { MdDashboard } from 'react-icons/md';

import usePortalStore from '@admin/common/store/usePortalStore';
import { COLOR_PRIMARY } from '@admin/common/constants';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: 'dashboard', icon: <PieChartOutlined />, label: 'Dashboard' },
  {
    key: 'dataAnalytics',
    icon: <DesktopOutlined />,
    label: 'Data & Analytics',
  },
  { key: 'pricing', icon: <PiMoney />, label: 'Pricing' },
  { key: 'customers', icon: <UserOutlined />, label: 'Customers' },
  {
    key: 'contentManagement',
    label: 'Content Management',
    icon: <BiBookContent />,
    children: [
      { key: 'publications', label: 'Publications' },
      { key: 'manageMetadata', label: 'Manage Metadata' },
      { key: 'addPublications', label: 'Add Publications' },
      { key: 'history', label: 'History' },
    ],
  },
  { key: '9', icon: <TbLogs />, label: 'Logs' },
];

function MainMenu(): ReactElement {
  const { mainMenuCollapsed, setCurrentMenuItem, currentMenuItem } =
    usePortalStore();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrentMenuItem(e.key);
  };

  return (
    <div
      className="h-full flex flex-col flex-grow shadow-md"
      style={{ width: mainMenuCollapsed ? 80 : 256 }}
    >
      <div className="w-full h-[80px] flex flex-row justify-center items-center gap-2">
        <MdDashboard size={30} color={COLOR_PRIMARY} />
        {!mainMenuCollapsed && (
          <span className="text-primary">Publisher Portal</span>
        )}
      </div>
      <Menu
        defaultValue={currentMenuItem}
        defaultOpenKeys={['addPublications', 'contentManagement']}
        defaultSelectedKeys={['addPublications', 'contentManagement']}
        mode="inline"
        onClick={onClick}
        inlineCollapsed={mainMenuCollapsed}
        items={items}
      />
    </div>
  );
}

export default MainMenu;
