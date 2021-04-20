import { Row, Col } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { dishes } from '../../../../fakeData/dishes';
import styles from './Body.module.scss';

const Body: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Row gutter={24} className={styles.row}>
        {dishes.map((item, index) => (
          <Col className="gutter-row" span={6} key={`category-${index}`}>
            <Link to={item.link}>
              <div className={styles.categoryContainer}>
                <div className={styles.img} style={{ backgroundImage: `url(${item.img})` }}></div>
                <span>{item.category}</span>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Body;
