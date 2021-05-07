import React from 'react';

import styles from './index.module.scss';

export const DishSkeleton: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.pic}></div>
        <div className={styles.title}></div>
        <div className={styles.ingredientContainer}>
          {Array(7)
            .fill(0)
            .map((index) => (
              <div className={styles.row} key={`ingr-${index}`}></div>
            ))}
          <div className={styles.addBtn}></div>
          <div className={styles.price}>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
