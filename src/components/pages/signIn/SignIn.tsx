import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import { pages } from '../../../consts/paths';
import styles from './SignIn.module.scss';

const SignIn: React.FC = (): JSX.Element => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const firebase = useFirebase();

  const submit = (email: string, password: string): void => {
    if (email && password) {
      firebase
        .login({
          email: email,
          password: password,
        })
        .then(() => {
          console.log('user');
        });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.title}>DishCalculator</div>
        <input placeholder="Email" className={styles.input} onChange={(e) => setEmailValue(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          className={styles.input}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <Link to={pages.main}>
          <div className={styles.btn} onClick={() => submit(emailValue, passwordValue)}>
            Sign In
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
