import React from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

interface IAddCancelBtns {
  value1: string;
  value2: string | number;
  addFunc: (value1: string, value2: string | number) => void;
  cancelFunc: () => void;
}

const cx = classNames.bind(styles);

export const AddCancelBtns: React.FC<IAddCancelBtns> = ({
  value1,
  value2,
  addFunc,
  cancelFunc,
}: IAddCancelBtns): JSX.Element => {
  const className = cx({
    submitBtn: true,
    disabledBtn: !value1 || !value2,
  });
  const { t } = useTranslation();

  return (
    <div className={styles.btnWrapper}>
      <button disabled={!value1 || !value2} className={className} onClick={() => addFunc(value1, value2)}>
        {t('addBtn.leftBtn')}
      </button>
      <div className={styles.cancelBtn} onClick={cancelFunc}>
        {t('addBtn.rightBtn')}
      </div>
    </div>
  );
};
