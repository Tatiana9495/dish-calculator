import React from 'react';
import { connect } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Input, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined, LeftOutlined } from '@ant-design/icons';

import { removeSingleDish } from '../../../../redux/actions/dish';
import { pages } from '../../../../consts/paths';
import styles from './Header.module.scss';

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

const Header: React.FC<IHeader> = ({ page, dish, removeSingleDish }: IHeader): JSX.Element => {
  const firebase = useFirebase();

  const logout = () => {
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
        <div className={styles.logo}>DishCalculator</div>
        <div className={styles.logoMobile}>{page === 'Main' ? <span>DC</span> : <LeftOutlined />}</div>
      </Link>
      <div className={styles.rightBlock}>
        <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={570}
          // style={{ width: 570, marginRight: 40, borderRadius: 5 }}
          options={options}
        >
          <Input.Search size="large" placeholder="Search" className={styles.inputSearch} />
        </AutoComplete>
        <div className={styles.signOutText} onClick={logout}>
          Sign out
        </div>
        <div className={styles.signOutIcon} onClick={logout}>
          <LogoutOutlined style={{ fontSize: '20px', color: '#000' }} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: IHeader) => ({
    dish: state.dish,
  }),
  { removeSingleDish }
)(Header);
