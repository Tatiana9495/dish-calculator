import React from 'react';

import Category from '../../shared/category/Category';
import Layout from '../../shared/layout/Layout';

const ColdDepartment: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <Category title="Холодный цех" />
    </Layout>
  );
};

export default ColdDepartment;
