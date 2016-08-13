import React from 'react';
import styles from './styles.css';

import { Link } from 'react-router';

function Navigation() {
  return (
    <div className={styles.navigation}>
      <Link activeClassName={styles.navigation_item_active} to="/dashboard/home"><p className={styles.navigation_item}>Dashboard</p></Link>
      <Link activeClassName={styles.navigation_item_active} to="/dashboard/matches"><p className={styles.navigation_item}>Matches</p></Link>
    </div>
  );
}

export default Navigation;