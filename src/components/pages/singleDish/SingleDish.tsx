import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import Layout from '../../shared/layout/Layout';
import styles from './SingleDish.module.scss';

const ingredients = [
  {
    title: 'Черри',
    count: 150,
  },
  {
    title: 'Петрушка',
    count: 10,
  },
  {
    title: 'Укроп',
    count: 15,
  },
  {
    title: 'Тофу',
    count: 250,
  },
];

const SingleDish: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div style={{ backgroundImage: `url(/tofu.jpg)` }} className={styles.pic}></div>
          <div className={styles.title}>Тофу скрембл</div>
          <div className={styles.ingredientContainer}>
            {ingredients.map((item, index) => (
              <div className={styles.row} key={`ingr-${index}`}>
                <div className={styles.deleteBtn}>-</div>
                <span className={styles.ingredient}>{item.title}</span>
                <span className={styles.portion}>{item.count}г</span>
              </div>
            ))}
            <div className={styles.addBtn}>
              <PlusOutlined style={{ color: '#40a9ff' }} />
            </div>
            <div className={styles.price}>
              <span>Цена, руб: </span>
              <span>290</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleDish;
