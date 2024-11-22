import React, { ReactElement } from 'react';

import { Avatar, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { IoIosLogOut } from 'react-icons/io';

import usePortalStore from '@admin/common/store/usePortalStore';
import useAuth from '@admin/auth/hooks/useAuth';
import { Loader2 } from 'lucide-react';

function MainHeader(): ReactElement {
  const { logout, loading } = useAuth();

  const { mainMenuCollapsed, setMainMenuCollapsed } = usePortalStore();

  return (
    <div className="w-full h-[80px] shadow-md bg-white border-0 border-b border-b-gray-200 flex justify-between items-center p-4">
      <Button
        type="default"
        size="large"
        onClick={() => setMainMenuCollapsed(!mainMenuCollapsed)}
      >
        {mainMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <div className="h-full flex items-center gap-6">
        <div className="h-full flex items-center gap-2">
          <Avatar size="large" icon={<UserOutlined />} />
          <span>Admin</span>
        </div>
        <Button type="primary" size="large" onClick={logout} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!loading && <IoIosLogOut size={20} />}
        </Button>
      </div>
    </div>
  );
}

export default MainHeader;
