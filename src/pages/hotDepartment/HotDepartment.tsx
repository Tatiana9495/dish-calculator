import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';

import { Collection } from '../../types';
import { Category } from '../../shared/category';

export const HotDepartment: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  useFirestoreConnect([{ collection: Collection.HotDepartment, orderBy: ['title', 'asc'] }]);

  const hotDepartment = useSelector((state: RootStateOrAny) => state.firestore.ordered.hot_department);

  return <Category title={t('main.0')} data={hotDepartment} collectionName={Collection.HotDepartment} />;
};
