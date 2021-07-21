import React from 'react';

import { Header } from '.';
import styles from './index.module.scss';

interface ILayout {
  children: React.ReactNode;
  page: string;
}

export const Layout: React.FC<ILayout> = ({ children, page }: ILayout): JSX.Element => {
  return (
    <div className={styles.layoutContainer}>
      <Header page={page} />
      {children}
    </div>
  );
};
