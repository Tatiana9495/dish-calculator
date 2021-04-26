import React from 'react';
import { Row, Col } from 'antd';
import Layout from '../../shared/layout/Layout';

import styles from './CategorySkeleton.module.scss';

const CategorySkeleton: React.FC = (): JSX.Element => {
  return (
    <Layout page="Category">
      <div className={styles.container}>
        <Row gutter={[24, 24]}>
          {Array(12)
            .fill(0)
            .map((index) => (
              <Col xs={24} md={12} lg={8} className="gutter-row" key={`dish-${index}`}>
                <div className={styles.dishContainer}>
                  <div className={styles.pic}></div>
                  <span className={styles.line}></span>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </Layout>
  );
};

export default CategorySkeleton;
