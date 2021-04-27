import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import classNames from 'classnames/bind';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import Loader from '../../shared/loader/Loader';
import Layout from '../../shared/layout/Layout';
import { Ingredient } from '../../../types';
import styles from './Ingredients.module.scss';

const cx = classNames.bind(styles);

const Ingredients: React.FC = (): JSX.Element => {
  const [title, setTitle] = useState<{ value: string; open: string | null }>({ value: '', open: null });
  const [price, setPrice] = useState<{ value: number | string; open: string | null }>({ value: '', open: null });
  const [isAddRowOpen, setAddRowOpen] = useState<boolean>(false);
  const [additionalValue, setAdditionalValue] = useState<{ title: string; price: number | string }>({
    title: '',
    price: '',
  });

  const className = cx({
    submitBtn: true,
    disabledBtn: !additionalValue.title || !additionalValue.price,
  });

  const firestore = useFirestore();
  useFirestoreConnect([{ collection: 'ingredients', orderBy: ['title', 'asc'] }]);

  const ingredients = useSelector((state: RootStateOrAny) => state.firestore.ordered.ingredients);

  const submitTitle = (event: React.KeyboardEvent, index: string): void => {
    if (event.key === 'Enter' && title.value) {
      firestore.collection('ingredients').doc(index).update({ title: title.value });
      setTitle({ value: '', open: null });
    }
  };

  const submitPrice = (event: React.KeyboardEvent, index: string): void => {
    if (event.key === 'Enter' && price.value) {
      firestore
        .collection('ingredients')
        .doc(index)
        .update({ price: Number(price.value) });
      setPrice({ value: '', open: null });
    }
  };

  const addIngredient = (title: string, price: string | number): void => {
    if (title && price) {
      firestore.collection('ingredients').add({ title: title, price: price });
      setAddRowOpen(false);
      setAdditionalValue({ title: '', price: '' });
    }
  };

  const deleteIngredient = (index: string): void => {
    firestore.collection('ingredients').doc(index).delete();
  };

  const cancelAddRow = () => {
    setAddRowOpen(false);
    setAdditionalValue({ title: '', price: '' });
  };

  return (
    <Layout page="Ingredients">
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.title}>Ingredients</div>
          {!isLoaded(ingredients) ? (
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            <div className={styles.table}>
              <div className={styles.row}>
                <div className={`${styles.firstColumn} ${styles.header}`}>№</div>
                <div className={`${styles.secondColumn} ${styles.header}`}>Название</div>
                <div className={`${styles.thirdColumn} ${styles.header}`}>Цена, руб</div>
              </div>
              {ingredients?.map((item: Ingredient, index: number) => (
                <div className={styles.row} key={`row-${index}`}>
                  <div className={`${styles.firstColumn} ${styles.standard}`}>{index + 1}</div>
                  <div
                    className={`${styles.secondColumn} ${styles.standard}`}
                    onClick={() => setTitle({ ...title, open: item.id })}
                  >
                    {title.open === item.id ? (
                      <input
                        placeholder={item.title}
                        value={title.value}
                        onChange={(e) => setTitle({ ...title, value: e.target.value })}
                        onKeyDown={(e) => submitTitle(e, item.id)}
                        className={styles.input}
                      />
                    ) : (
                      item.title
                    )}
                  </div>
                  <div
                    className={`${styles.thirdColumn} ${styles.standard}`}
                    onClick={() => setPrice({ ...price, open: item.id })}
                  >
                    {price.open === item.id ? (
                      <input
                        placeholder={item.price.toString()}
                        type="number"
                        value={price.value}
                        onChange={(e) => setPrice({ ...price, value: e.target.value })}
                        onKeyDown={(e) => submitPrice(e, item.id)}
                        className={`${styles.input} ${styles.centeredInput}`}
                      />
                    ) : (
                      item.price
                    )}
                  </div>
                  <div className={styles.tooltip}>
                    <DeleteOutlined
                      onClick={() => deleteIngredient(item.id)}
                      style={{ color: '#F44F4F', fontSize: '16px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {isAddRowOpen && (
            <div className={`${styles.row} ${styles.addRow}`}>
              <div className={`${styles.firstColumn} ${styles.standard}`}></div>
              <div className={`${styles.secondColumn} ${styles.standard}`}>
                <input
                  className={styles.input}
                  onChange={(e) => setAdditionalValue({ ...additionalValue, title: e.target.value })}
                  value={additionalValue.title}
                />
              </div>
              <div className={`${styles.thirdColumn} ${styles.standard}`}>
                <input
                  className={`${styles.input} ${styles.centeredInput}`}
                  onChange={(e) => setAdditionalValue({ ...additionalValue, price: e.target.value })}
                  value={additionalValue.price}
                  type="number"
                />
              </div>
            </div>
          )}
          {isAddRowOpen ? (
            <div className={styles.btnWrapper}>
              <button
                disabled={!additionalValue.title || !additionalValue.price}
                className={className}
                onClick={() => addIngredient(additionalValue.title, additionalValue.price)}
              >
                Add
              </button>
              <div className={styles.cancelBtn} onClick={cancelAddRow}>
                Cancel
              </div>
            </div>
          ) : (
            isLoaded(ingredients) && (
              <div className={styles.addBtn} onClick={() => setAddRowOpen(true)}>
                <PlusOutlined style={{ color: '#40a9ff' }} />
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Ingredients;
