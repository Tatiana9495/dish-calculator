import React from 'react';

import { Layout } from '../../shared/layout';
import { Body } from './Body';

export const Main: React.FC = (): JSX.Element => {
  return (
    <Layout page="Main">
      <Body />
    </Layout>
  );
};
