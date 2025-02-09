'use client';

import { ReactNode } from 'react';
import * as style from './SideBar.css';

type SideBarProps = {
  children?: ReactNode;
};

export function SideBar({ children }: SideBarProps) {
  return <div className={style.sidebarStyle}>{children}</div>;
}
