import React from 'react';

import Layout from '../../shared/layout/Layout';
import Body from './body/Body';
import Header from '../../shared/layout/header/Header';

const Main: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <Header />
      <Body />
    </Layout>
  );
};

export default Main;
