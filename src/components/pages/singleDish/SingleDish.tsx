import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { RootStateOrAny, useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';

import Layout from '../../shared/layout/Layout';
import styles from './SingleDish.module.scss';
import DishSkeleton from '../../shared/dishSkeleton/DishSkeleton';
interface ISingleDish {
  dish: null | {
    collection: string;
    id: string;
    title: string;
    portion: string | number;
  };
}

const SingleDish: React.FC<ISingleDish> = ({ dish }: ISingleDish): JSX.Element => {
  dish &&
    useFirestoreConnect([
      {
        collection: dish.collection,
        orderBy: ['title', 'asc'],
        doc: dish.id,
        subcollections: [{ collection: 'ingredients' }],
      },
    ]);

  const ingredients = useSelector((state: RootStateOrAny) => dish && state.firestore.ordered[dish.collection]);

  useEffect(() => {
    console.log('ingr ', ingredients);
  }, [ingredients]);

  return (
    <Layout page="Dish">
      {!isLoaded(ingredients) ? (
        <DishSkeleton />
      ) : (
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div style={{ backgroundImage: `url(/tofu.jpg)` }} className={styles.pic}></div>
            <div className={styles.title}>{dish?.title}</div>
            <div className={styles.ingredientContainer}>
              {ingredients?.map((item: { title: string; portion: string | number }, index: number) => (
                <div className={styles.row} key={`ingr-${index}`}>
                  <div className={styles.deleteBtn}>-</div>
                  <span className={styles.ingredient}>{item.title}</span>
                  <span className={styles.portion}>{item.portion}г</span>
                </div>
              ))}
              <div className={styles.row}>
                <input className={styles.inputTitle} />
                <div className={styles.dots}></div>
                <input className={styles.inputPortion} />
              </div>
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
      )}
    </Layout>
  );
};

export default connect((state: ISingleDish) => ({
  dish: state.dish,
}))(SingleDish);
