import React from 'react';
import classNames from 'classnames/bind';

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

  return (
    <div className={styles.btnWrapper}>
      <button disabled={!value1 || !value2} className={className} onClick={() => addFunc(value1, value2)}>
        Add
      </button>
      <div className={styles.cancelBtn} onClick={cancelFunc}>
        Cancel
      </div>
    </div>
  );
};
