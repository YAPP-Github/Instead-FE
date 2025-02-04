'use client';

import { ReactNode } from 'react';
import * as styles from './NavBar.css';

export type NavBarProps = {
  leftAddon: ReactNode;
  rightAddon: ReactNode;
  isScrolled: boolean;
};

export function NavBar({ leftAddon, rightAddon, isScrolled }: NavBarProps) {
  return (
    <div className={`${styles.navBar} ${isScrolled ? styles.scrolled : ''}`}>
      {leftAddon}
      {rightAddon}
    </div>
  );
}

export default NavBar;
