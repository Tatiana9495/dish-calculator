import React from 'react';

import Layout from '../../shared/layout/Layout';
import Body from './body/Body';

const Main: React.FC = (): JSX.Element => {
  return (
    <Layout page="Main">
      <Body />
    </Layout>
  );
};

export default Main;
