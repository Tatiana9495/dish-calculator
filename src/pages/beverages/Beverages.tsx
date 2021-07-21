import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';

import { Collection } from '../../types';
import { Category } from '../../shared/category';

export const Beverages: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  useFirestoreConnect([
    {
      collection: Collection.Beverages,
      orderBy: ['title', 'asc'],
    },
  ]);

  const beverages = useSelector((state: RootStateOrAny) => state.firestore.ordered.beverages);

  return <Category title={t('main.2')} data={beverages} collectionName={Collection.Beverages} />;
};
