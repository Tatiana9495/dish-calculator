import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { Category } from '../../shared/category';

export const ColdDepartment: React.FC = (): JSX.Element => {
  useFirestoreConnect([{ collection: 'cold_department', orderBy: ['title', 'asc'] }]);

  const coldDepartment = useSelector((state: RootStateOrAny) => state.firestore.ordered.cold_department);

  return <Category title="Холодный цех" data={coldDepartment} collectionName="cold_department" />;
};
