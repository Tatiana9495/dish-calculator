import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Category from '../../shared/category/Category';

const Desserts: React.FC = (): JSX.Element => {
  useFirestoreConnect([{ collection: 'desserts', orderBy: ['title', 'asc'] }]);

  const desserts = useSelector((state: RootStateOrAny) => state.firestore.ordered.desserts);

  return <Category title="Десерты" data={desserts} collectionName="desserts" />;
};

export default Desserts;
