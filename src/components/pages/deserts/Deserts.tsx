import React from 'react';
import Layout from '../../shared/layout/Layout';

import Category from '../../shared/category/Category';

const Deserts: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <Category title="Десерты" />
    </Layout>
  );
};

export default Deserts;
