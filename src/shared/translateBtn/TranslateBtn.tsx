import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';

interface ITranslateBtn {
  changeLanguage: (language: string) => void;
}

const data = [
  {
    id: 1,
    title: 'en',
  },
  {
    id: 2,
    title: 'ru',
  },
];

export const TranslateBtn: React.FC<ITranslateBtn> = (props: ITranslateBtn): JSX.Element => {
  const { changeLanguage } = props;
  const [lang, setLang] = useState('ru');

  const switchLanguage = (language: string) => {
    changeLanguage(language);
    setLang(language);
  };

  useEffect(() => {
    changeLanguage(lang);
  }, []);

  return (
    <div className={styles.container}>
      {data.map((item) => {
        return (
          <div className={styles.btnWrapper} onClick={() => switchLanguage(item.title)} key={`language-${item.id}`}>
            <div className={styles.circle}>{lang === item.title && <div className={styles.innerCircle}></div>}</div>
            <span>{item.title}</span>
          </div>
        );
      })}
    </div>
  );
};
