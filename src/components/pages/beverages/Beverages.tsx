import React from 'react';

import Category from '../../shared/category/Category';
import Layout from '../../shared/layout/Layout';

const Beverages: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <Category title="Напитки" />
    </Layout>
  );
};

export default Beverages;
