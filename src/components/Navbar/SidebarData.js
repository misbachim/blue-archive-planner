import React from 'react';
import * as FaIcons from 'react-icons/fa'
import * as GiIcons from 'react-icons/gi'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
  {
    title: 'Characters',
    path: '/characters',
    icon: <IoIcons.IoIosMan />,
    cName: 'nav-text'
  },
  {
    title: 'Gear Optimization',
    path: '/gear-optimization',
    icon: <GiIcons.GiBattleGear />,
    cName: 'nav-text'
  },
  {
    title: 'Inventory',
    path: '/inventory',
    icon: <FaIcons.FaShoppingBag />,
    cName: 'nav-text'
  },
]