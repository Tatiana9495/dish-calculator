import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { dishes } from '../../fakeData/dishes';
import styles from './index.module.scss';

export const Body: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]} className={styles.row}>
        {dishes.map((item, index) => (
          <Col className="gutter-row" xs={24} md={6} key={`category-${index}`}>
            <Link to={item.link}>
              <div className={styles.categoryContainer}>
                <div className={styles.img} style={{ backgroundImage: `url(${item.img})` }}></div>
                <span>{t(`main.${item.id - 1}`)}</span>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};
