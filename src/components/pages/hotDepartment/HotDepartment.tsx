import React from 'react';
import Layout from '../../shared/layout/Layout';

import Category from '../../shared/category/Category';

const HotDepartment: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <Category title="Горячий цех" />
    </Layout>
  );
};

export default HotDepartment;
