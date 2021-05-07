import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { RootStateOrAny, useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { Layout } from '../../shared/layout';
import { DishSkeleton } from '../../shared/dishSkeleton';
import { AddCancelBtns } from '../../shared/addCancelBtns';
import styles from './index.module.scss';
interface ISingleDish {
  dish: null | {
    collection: string;
    id: string;
    title: string;
    portion: string | number;
    img?: string | undefined;
  };
}

const _SingleDish: React.FC<ISingleDish> = ({ dish }: ISingleDish): JSX.Element => {
  const [inputsValue, setInputsValue] = useState<{ title: string; portion: string | number }>({
    title: '',
    portion: '',
  });
  const [isInputOpen, setInputOpen] = useState<{ title: number | null; portion: number | null }>({
    title: null,
    portion: null,
  });
  const [isAddRowOpen, setAddRowOpen] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const portionRef = useRef<HTMLInputElement>(null);

  useOutsideClick(titleRef, () => {
    if (isInputOpen.title) {
      setInputOpen({ ...isInputOpen, title: null });
    }
  });

  useOutsideClick(portionRef, () => {
    if (isInputOpen.portion) {
      setInputOpen({ ...isInputOpen, portion: null });
    }
  });

  dish &&
    useFirestoreConnect([
      {
        collection: dish.collection,
        orderBy: ['title', 'asc'],
        doc: dish.id,
        subcollections: [{ collection: 'ingredients' }],
        storeAs: dish.collection,
      },
    ]);

  const ingredients = useSelector((state: RootStateOrAny) => dish && state.firestore.ordered[dish.collection]);

  const firestore = useFirestore();

  const deleteIngredient = (id: string): void => {
    if (dish) {
      firestore.collection(dish.collection).doc(dish.id).collection('ingredients').doc(id).delete();
    }
  };

  const addIngredient = (title: string, portion: string | number): void => {
    if (dish && title && portion) {
      firestore
        .collection(dish.collection)
        .doc(dish.id)
        .collection('ingredients')
        .add({ title: title, portion: portion });
    }
    setInputsValue({ title: '', portion: '' });
    setAddRowOpen(false);
  };

  const updateTitle = (event: React.KeyboardEvent, id: string, title: string): void => {
    if (dish && event.key === 'Enter' && title) {
      firestore.collection(dish.collection).doc(dish.id).collection('ingredients').doc(id).update({ title: title });
      setInputOpen({ ...isInputOpen, title: null });
      setInputsValue({ ...inputsValue, title: '' });
    }
  };

  const updatePortion = (event: React.KeyboardEvent, id: string, portion: string | number) => {
    if (dish && event.key === 'Enter' && portion) {
      firestore.collection(dish.collection).doc(dish.id).collection('ingredients').doc(id).update({ portion: portion });
      setInputOpen({ ...isInputOpen, portion: null });
      setInputsValue({ ...inputsValue, portion: '' });
    }
  };

  const cancelAddRow = (): void => {
    setAddRowOpen(false);
    setInputsValue({ title: '', portion: '' });
  };

  return (
    <Layout page="Dish">
      {!isLoaded(ingredients) ? (
        <DishSkeleton />
      ) : (
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div
              style={dish?.img ? { backgroundImage: `url(${dish.img})` } : { backgroundImage: `url(/tofu.jpg)` }}
              className={styles.pic}
            ></div>
            <div className={styles.title}>{dish?.title}</div>
            <div className={styles.ingredientContainer}>
              {ingredients?.map((item: { id: string; title: string; portion: string | number }, index: number) => (
                <div className={styles.row} key={`ingr-${index}`}>
                  <div className={styles.deleteBtn} onClick={() => deleteIngredient(item.id)}>
                    -
                  </div>
                  {isInputOpen.title === index + 1 ? (
                    <>
                      <input
                        ref={titleRef}
                        className={styles.inputTitle}
                        value={inputsValue.title}
                        onChange={(e) => setInputsValue({ ...inputsValue, title: e.target.value })}
                        onKeyDown={(e) => updateTitle(e, item.id, inputsValue.title)}
                      />
                      <div className={styles.dots}></div>
                    </>
                  ) : (
                    <span
                      className={styles.ingredient}
                      onClick={() => setInputOpen({ ...isInputOpen, title: index + 1 })}
                    >
                      {item.title}
                    </span>
                  )}
                  {isInputOpen.portion === index + 1 ? (
                    <input
                      ref={portionRef}
                      className={styles.inputPortion}
                      type="number"
                      value={inputsValue.portion}
                      onChange={(e) => setInputsValue({ ...inputsValue, portion: e.target.value })}
                      onKeyDown={(e) => updatePortion(e, item.id, inputsValue.portion)}
                    />
                  ) : (
                    <span
                      className={styles.portion}
                      onClick={() => setInputOpen({ ...isInputOpen, portion: index + 1 })}
                    >
                      {item.portion}г
                    </span>
                  )}
                </div>
              ))}
              {isAddRowOpen && (
                <>
                  <div className={styles.row}>
                    <input
                      className={styles.inputTitle}
                      value={inputsValue.title}
                      onChange={(e) => setInputsValue({ ...inputsValue, title: e.target.value })}
                    />
                    <div className={styles.dots}></div>
                    <input
                      className={styles.inputPortion}
                      type="number"
                      value={inputsValue.portion}
                      onChange={(e) => setInputsValue({ ...inputsValue, portion: e.target.value })}
                    />
                  </div>
                  <AddCancelBtns
                    value1={inputsValue.title}
                    value2={inputsValue.portion}
                    addFunc={addIngredient}
                    cancelFunc={cancelAddRow}
                  />
                </>
              )}
              {!isAddRowOpen && (
                <div className={styles.addBtn} onClick={() => setAddRowOpen(true)}>
                  <PlusOutlined style={{ color: '#40a9ff' }} />
                </div>
              )}
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

export const SingleDish = connect((state: ISingleDish) => ({
  dish: state.dish,
}))(_SingleDish);
