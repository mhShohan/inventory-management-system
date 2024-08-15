import {
  AimOutlined,
  AntDesignOutlined,
  ApartmentOutlined,
  AreaChartOutlined,
  MoneyCollectFilled,
  ProfileFilled,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const sidebarItems = [
  {
    key: 'Dashboard',
    label: <NavLink to='/'>DASHBOARD</NavLink>,
    icon: React.createElement(ProfileFilled),
  },
  {
    key: 'Add Product',
    label: <NavLink to='/create-product'>ADD PRODUCT</NavLink>,
    icon: React.createElement(AntDesignOutlined),
  },
  {
    key: 'Manage Products',
    label: <NavLink to='/products'>MANAGE PRODUCTS</NavLink>,
    icon: React.createElement(MoneyCollectFilled),
  },
  {
    key: 'Manage Sales',
    label: <NavLink to='/sales'>MANAGE SALES</NavLink>,
    icon: React.createElement(AreaChartOutlined),
  },
  {
    key: 'Manage Seller',
    label: <NavLink to='/sellers'>MANAGE SELLERS</NavLink>,
    icon: React.createElement(ApartmentOutlined),
  },
  {
    key: 'Manage Purchase',
    label: <NavLink to='/purchases'>MANAGE PURCHASES</NavLink>,
    icon: React.createElement(AimOutlined),
  },
  // {
  //   key: 'Sales History',
  //   label: <NavLink to='/sales-history'>SALES HISTORY</NavLink>,
  //   icon: React.createElement(HistoryOutlined),
  // },
  {
    key: 'Profile',
    label: <NavLink to='/profile'>PROFILE</NavLink>,
    icon: React.createElement(UserOutlined),
  },
];
