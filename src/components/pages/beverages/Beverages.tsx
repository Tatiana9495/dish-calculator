import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Category from '../../shared/category/Category';

const Beverages: React.FC = (): JSX.Element => {
  useFirestoreConnect([{ collection: 'beverages', orderBy: ['title', 'asc'] }]);

  const beverages = useSelector((state: RootStateOrAny) => state.firestore.ordered.beverages);

  return <Category title="Напитки" data={beverages} collectionName="beverages" />;
};

export default Beverages;
