'use client';

import { ReactNode } from 'react';
import * as styles from './NavBar.css';

export type NavBarProps = {
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  isScrolled: boolean;
};

export function NavBar({ leftAddon, rightAddon, isScrolled }: NavBarProps) {
  const getNavBarClassName = () => {
    const classes = [styles.navBar];
    if (isScrolled) classes.push(styles.scrolled);
    if (leftAddon && rightAddon) classes.push(styles.bothAddons);
    else if (rightAddon && !leftAddon) classes.push(styles.rightAddonOnly);
    return classes.join(' ');
  };

  return (
    <div className={getNavBarClassName()}>
      <div className={styles.addonStyle}>{leftAddon}</div>
      <div className={styles.addonStyle}>{rightAddon}</div>
    </div>
  );
}

export default NavBar;
