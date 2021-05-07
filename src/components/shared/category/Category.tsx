import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Modal, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link, useRouteMatch } from 'react-router-dom';
import { isLoaded, useFirestore } from 'react-redux-firebase';

import { Layout } from '../../shared/layout';
import { addSingleDish } from '../../../redux/actions/dish';
import { AddDishForm } from '../addDishForm';
import { CategorySkeleton } from '../categorySkeleton';
import styles from './index.module.scss';

interface ICategory {
  title: string;
  data: {
    id: string;
    title: string;
    portion: number;
    img?: string | undefined;
  }[];
  collectionName: string;
  addSingleDish: (
    collection: string,
    id: string,
    title: string,
    portion: string | number,
    img: string | ArrayBuffer | undefined
  ) => void;
}

const _Category: React.FC<ICategory> = ({ title, data, collectionName, addSingleDish }: ICategory): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [dishValue, setDishValue] = useState<{
    title: string;
    portion: string;
    img?: string | ArrayBuffer | undefined;
  }>({
    title: '',
    portion: '',
    img: '',
  });
  const [isEditMode, setEditMode] = useState<number>(-1);
  const firestore = useFirestore();

  const { url } = useRouteMatch();

  const addItem = (
    title: string,
    portion: string | number,
    name: string,
    img: string | ArrayBuffer | undefined
  ): void => {
    if (title && portion) {
      firestore.collection(name).add({ title: title, portion: portion, img: img });
    }
  };

  const updateDish = (
    name: string,
    id: string,
    title: string,
    portion: string | number,
    img: string | ArrayBuffer | undefined
  ): void => {
    if (title && portion) {
      firestore.collection(name).doc(id).update({ title: title, portion: portion, img: img });
      setEditMode(-1);
      setDishValue({ title: '', portion: '' });
    }
  };

  const deleteDish = (name: string, id: string): void => {
    firestore.collection(name).doc(id).delete();
  };

  const submit = (title: string, portion: string | number, name: string, img: string | ArrayBuffer | undefined) => {
    addItem(title, portion, name, img);
    setModalOpen(false);
    setDishValue({ title: '', portion: '', img: '' });
  };

  return (
    <Layout page="Category">
      <div className={styles.container}>
        <div className={styles.mainTitle}>{title}</div>
        {!isLoaded(data) ? (
          <CategorySkeleton />
        ) : (
          <>
            <Row gutter={[24, 24]}>
              {data?.map((item, index) => (
                <Col xs={24} md={12} lg={8} className="gutter-row" key={`dish-${index}`}>
                  <Link
                    to={`${url}/${item.id}`}
                    onClick={() => addSingleDish(collectionName, item.id, item.title, item.portion, item.img)}
                  >
                    <div className={styles.dishContainer}>
                      {item?.img ? (
                        <div className={styles.realPic} style={{ backgroundImage: `url(${item.img})` }}></div>
                      ) : (
                        <div className={styles.pic}></div>
                      )}
                      <span>{item.title}</span>
                    </div>
                  </Link>
                  <div className={styles.btnsWrapper}>
                    <Popconfirm
                      title="Вы уверены что хотите удалить эту позицию?"
                      onConfirm={() => deleteDish(collectionName, item.id)}
                      placement="left"
                      okText="Да"
                      cancelText="Нет"
                    >
                      <DeleteOutlined className={styles.deleteBtn} />
                    </Popconfirm>
                    <EditOutlined className={styles.editBtn} onClick={() => setEditMode(index)} />
                    {isEditMode === index && (
                      <Modal
                        centered
                        visible={isEditMode === index}
                        title="Редактировать позицию"
                        onOk={() => setEditMode(-1)}
                        onCancel={() => setEditMode(-1)}
                        footer={[
                          <Button key="back" onClick={() => setEditMode(-1)}>
                            Cancel
                          </Button>,
                          <Button
                            key="submit"
                            type="primary"
                            onClick={() =>
                              updateDish(collectionName, item.id, dishValue.title, dishValue.portion, dishValue.img)
                            }
                          >
                            Submit
                          </Button>,
                        ]}
                      >
                        <AddDishForm
                          setDishValue={setDishValue}
                          dishValue={dishValue}
                          placeholderTitle={item.title}
                          placeholderPortion={item.portion.toString()}
                        />
                      </Modal>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
            <div className={styles.addBtn} onClick={() => setModalOpen(true)}>
              <PlusOutlined style={{ color: '#40a9ff' }} />
            </div>
            <Modal
              visible={isModalOpen}
              title="Добавить позицию"
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
              footer={[
                <Button key="back" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => submit(dishValue.title, dishValue.portion, collectionName, dishValue.img)}
                >
                  Submit
                </Button>,
              ]}
            >
              <AddDishForm setDishValue={setDishValue} dishValue={dishValue} />
            </Modal>
          </>
        )}
      </div>
    </Layout>
  );
};

export const Category = connect(null, { addSingleDish })(_Category);
