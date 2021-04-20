import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import Layout from '../../shared/layout/Layout';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { dishes } from '../../../fakeData/dishes';
import styles from './Category.module.scss';
import AddDishForm from '../addDishForm/AddDishForm';
import { pages } from '../../../consts/paths';

interface ICategory {
  title: string;
}

const Category: React.FC<ICategory> = ({ title }: ICategory): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.mainTitle}>{title}</div>
        <Row gutter={[24, 24]}>
          {dishes
            .filter((item) => item.category === title)[0]
            .dishes.sort((a, b) => a.title.localeCompare(b.title))
            .map((item, index) => (
              <Col span={8} className="gutter-row" key={`dish-${index}`}>
                <Link to={pages.singleDish}>
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
            <Button key="submit" type="primary" onClick={() => setModalOpen(false)}>
              Submit
            </Button>,
          ]}
        >
          <AddDishForm />
        </Modal>
      </div>
    </Layout>
  );
};

export default Category;
