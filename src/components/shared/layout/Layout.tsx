import React from 'react';

import Header from './header/Header';
import styles from './Layout.module.scss';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }: ILayout): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
