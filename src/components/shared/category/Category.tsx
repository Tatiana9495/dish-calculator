import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Modal } from 'antd';
import Layout from '../../shared/layout/Layout';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useRouteMatch } from 'react-router-dom';
import { isLoaded, useFirestore } from 'react-redux-firebase';

import { addSingleDish } from '../../../redux/actions/dish';
import styles from './Category.module.scss';
import AddDishForm from '../addDishForm/AddDishForm';
import CategorySkeleton from '../categorySkeleton/CategorySkeleton';

interface ICategory {
  title: string;
  data: {
    id: string;
    title: string;
    portion: number;
  }[];
  collectionName: string;
  addSingleDish: (collection: string, id: string, title: string, portion: string | number) => void;
}

const Category: React.FC<ICategory> = ({ title, data, collectionName, addSingleDish }: ICategory): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [dishValue, setDishValue] = useState<{ title: string; portion: string; img?: string | ArrayBuffer | null }>({
    title: '',
    portion: '',
    // img: '',
  });
  const firestore = useFirestore();

  const { url } = useRouteMatch();

  const addItem = (title: string, portion: string | number, name: string): void => {
    if (title && portion) {
      firestore.collection(name).add({ title: title, portion: portion });
    }
  };

  const submit = (title: string, portion: string | number, name: string) => {
    addItem(title, portion, name);
    setModalOpen(false);
    setDishValue({ title: '', portion: '' });
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
              {data
                // ?.sort((a, b) => a.title.localeCompare(b.title))
                ?.map((item, index) => (
                  <Col xs={24} md={12} lg={8} className="gutter-row" key={`dish-${index}`}>
                    <Link
                      to={`${url}/${item.id}`}
                      onClick={() => addSingleDish(collectionName, item.id, item.title, item.portion)}
                    >
                      <div className={styles.dishContainer}>
                        <div className={styles.pic}></div>
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </Col>
                ))}
            </Row>
            <div className={styles.addBtn} onClick={() => setModalOpen(true)}>
              <PlusOutlined style={{ color: '#40a9ff' }} />
            </div>
            <Modal
              visible={isModalOpen}
              title="Add a dish"
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
              footer={[
                <Button key="back" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => submit(dishValue.title, dishValue.portion, collectionName)}
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

export default connect(null, { addSingleDish })(Category);
