import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Layout from '../../shared/layout/Layout';
import { Ingredient } from '../../../types';
import styles from './Ingredients.module.scss';

const Ingredients: React.FC = (): JSX.Element => {
  const [titleValue, setTitleValue] = useState<null | number>(null);
  const [priceValue, setPriceValue] = useState<null | number>(null);
  useFirestoreConnect([{ collection: 'ingredients' }]);

  const ingredients = useSelector((state: RootStateOrAny) => state.firestore.ordered.ingredients);

  useEffect(() => {
    console.log('titleValue', titleValue);
  }, [titleValue]);

  return (
    <Layout page="Ingredients">
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.title}>Ingredients</div>
          <div className={styles.table}>
            <div className={styles.row}>
              <div className={`${styles.firstColumn} ${styles.header}`}>№</div>
              <div className={`${styles.secondColumn} ${styles.header}`}>Название</div>
              <div className={`${styles.thirdColumn} ${styles.header}`}>Цена, руб</div>
            </div>
            {ingredients?.map((item: Ingredient, index: number) => (
              <div className={styles.row} key={`row-${index}`}>
                <div className={`${styles.firstColumn} ${styles.standard}`}>{index + 1}</div>
                <div className={`${styles.secondColumn} ${styles.standard}`} onClick={() => setTitleValue(index)}>
                  {titleValue === index ? (
                    <input placeholder={item.title} onSubmit={() => setTitleValue(null)} className={styles.input} />
                  ) : (
                    item.title
                  )}
                </div>
                <div className={`${styles.thirdColumn} ${styles.standard}`} onClick={() => setPriceValue(index)}>
                  {priceValue === index ? (
                    <input
                      placeholder={item.price.toString()}
                      onSubmit={() => setPriceValue(null)}
                      className={styles.input}
                    />
                  ) : (
                    item.price
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ingredients;
