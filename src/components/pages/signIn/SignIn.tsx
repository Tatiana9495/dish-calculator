import React from 'react';
import { Link } from 'react-router-dom';

import { pages } from '../../../consts/paths';
import styles from './SignIn.module.scss';

const SignIn: React.FC = (): JSX.Element => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.title}>DishCalculator</div>
        <input placeholder="Email" className={styles.input} />
        <input placeholder="Password" className={styles.input} />
        <Link to={pages.main}>
          <div className={styles.btn}>Sign In</div>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
