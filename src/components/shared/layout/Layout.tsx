import React from 'react';

import Header from './header/Header';
import styles from './Layout.module.scss';

interface ILayout {
  children: React.ReactNode;
  page: string;
}

const Layout: React.FC<ILayout> = ({ children, page }: ILayout): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header page={page} />
      {children}
    </div>
  );
};

export default Layout;
