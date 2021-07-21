import React from 'react';
import { Row, Col } from 'antd';

import { Layout } from '../../shared/layout';
import styles from './index.module.scss';

export const CategorySkeleton: React.FC = (): JSX.Element => {
  return (
    <Layout page="Category">
      <div className={styles.container}>
        <Row gutter={[24, 24]}>
          {Array(12)
            .fill(0)
            .map(() => (
              <Col xs={24} md={12} lg={8} className="gutter-row" key={Math.random()}>
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
