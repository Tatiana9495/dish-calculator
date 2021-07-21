import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { pages } from '../../consts/paths';
import styles from './index.module.scss';

export const SignIn: React.FC = (): JSX.Element => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const firebase = useFirebase();
  const { t } = useTranslation();

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
        <div className={styles.title}>{t('signIn.title')}</div>
        <input
          placeholder={t('signIn.placeholder1')}
          className={styles.input}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <input
          placeholder={t('signIn.placeholder2')}
          type="password"
          className={styles.input}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <Link to={pages.main}>
          <div className={styles.btn} onClick={() => submit(emailValue, passwordValue)}>
            {t('signIn.button')}
          </div>
        </Link>
      </div>
    </div>
  );
};
