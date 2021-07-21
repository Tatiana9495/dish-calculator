import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';

import { Collection } from '../../types';
import { Category } from '../../shared/category';

export const Desserts: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  useFirestoreConnect([{ collection: Collection.Desserts, orderBy: ['title', 'asc'] }]);

  const desserts = useSelector((state: RootStateOrAny) => state.firestore.ordered.desserts);

  return <Category title={t('main.3')} data={desserts} collectionName={Collection.Desserts} />;
};
