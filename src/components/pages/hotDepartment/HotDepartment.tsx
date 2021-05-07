import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { Category } from '../../shared/category';

export const HotDepartment: React.FC = (): JSX.Element => {
  useFirestoreConnect([{ collection: 'hot_department', orderBy: ['title', 'asc'] }]);

  const hotDepartment = useSelector((state: RootStateOrAny) => state.firestore.ordered.hot_department);

  return <Category title="Горячий цех" data={hotDepartment} collectionName="hot_department" />;
};
