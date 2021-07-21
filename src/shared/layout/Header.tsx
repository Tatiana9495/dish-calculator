import React from 'react';
import { connect } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Input, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined, LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { removeSingleDish } from '../../redux/actions/dish';
import { pages } from '../../consts/paths';
import { TranslateBtn } from '../translateBtn';
import styles from './index.module.scss';

const options = [
  {
    value: 'укроп',
  },
  { value: 'петрушка' },
];

interface IHeader {
  page: string;
  dish: null | {
    id: string;
    title: string;
    portion: string;
  };
  removeSingleDish: () => void;
}

const _Header: React.FC<IHeader> = ({ page, dish, removeSingleDish }: IHeader): JSX.Element => {
  const firebase = useFirebase();
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
  };

  const logout = (): void => {
    firebase.logout();
  };

  const deleteDish = (): void => {
    if (dish) {
      removeSingleDish();
    }
  };

  return (
    <div className={styles.container}>
      {/* {page === 'Main' ? (
        <Link to={pages.main}>
          <div className={styles.logo}>DishCalculator</div>
          <div className={styles.logoMobile}>DC</div>
        </Link>
      ) : (
        <Link to={pages.main}>
          <div className={styles.logoBack}>
            <LeftOutlined />
          </div>
        </Link>
      )} */}
      <Link to={pages.main} onClick={deleteDish}>
        <div className={styles.logo}>{t('layout.title1')}</div>
        <div className={styles.logoMobile}>
          {page === 'Main' ? <span>{t('layout.title2')}</span> : <LeftOutlined />}
        </div>
      </Link>
      <div className={styles.rightBlock}>
        <TranslateBtn changeLanguage={changeLanguage} />
        <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={570}
          // style={{ width: 570, marginRight: 40, borderRadius: 5 }}
          options={options}
        >
          <Input.Search size="large" placeholder={t('layout.placeholder')} className={styles.inputSearch} />
        </AutoComplete>
        <div className={styles.signOutText} onClick={logout}>
          {t('layout.btn')}
        </div>
        <div className={styles.signOutIcon} onClick={logout}>
          <LogoutOutlined style={{ fontSize: '20px', color: '#000' }} />
        </div>
      </div>
    </div>
  );
};

export const Header = connect(
  (state: IHeader) => ({
    dish: state.dish,
  }),
  { removeSingleDish }
)(_Header);
