import React from 'react';
import { Input, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { pages } from '../../../../consts/paths';

const options = [
  {
    value: 'укроп',
  },
  { value: 'петрушка' },
];

const Header: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Link to={pages.main}>
        <div className={styles.logo}>DishCalculator</div>
      </Link>
      <div className={styles.rightBlock}>
        <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={570}
          style={{ width: 570, marginRight: 40, borderRadius: 5 }}
          options={options}
        >
          <Input.Search size="large" placeholder="Search" />
        </AutoComplete>
        <div>Sign out</div>
      </div>
    </div>
  );
};

export default Header;
