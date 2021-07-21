import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';

import { Collection } from '../../types';
import { Category } from '../../shared/category';

export const ColdDepartment: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  useFirestoreConnect([{ collection: Collection.ColdDepartment, orderBy: ['title', 'asc'] }]);

  const coldDepartment = useSelector((state: RootStateOrAny) => state.firestore.ordered.cold_department);

  return <Category title={t('main.1')} data={coldDepartment} collectionName={Collection.ColdDepartment} />;
};
