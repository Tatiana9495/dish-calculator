import React, { useState, useRef } from 'react';
import { Form, Input } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

interface IAddDishForm {
  setDishValue: (value: any) => void;
  dishValue: {
    title: string;
    portion: string | number;
    img?: string | ArrayBuffer | undefined;
  };
  placeholderPortion?: string;
  placeholderTitle?: string;
}

export const AddDishForm: React.FC<IAddDishForm> = ({
  dishValue,
  setDishValue,
  placeholderTitle,
  placeholderPortion,
}: IAddDishForm): JSX.Element => {
  const [form] = Form.useForm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFiles = (files: FileList): void => {
    if (validateFile(files[0])) {
      setFileName(files[0].name);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setDishValue({ ...dishValue, img: reader.result });
      };
    } else {
      return;
      // setFailure(true);
      // setSuccess(false);
      // setPhoto('');
    }
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  // const fileInputClicked = (): void => {
  //   if (inputRef.current) inputRef.current.click();
  // };

  const selectFiles = (): void => {
    if (inputRef.current?.files?.length) {
      handleFiles(inputRef.current.files);
    }
  };

  const removeImg = (): void => {
    setFileName('');
    setDishValue({ ...dishValue, img: '' });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      // onValuesChange={onRequiredTypeChange}
    >
      <Form.Item label="Название блюда">
        <Input
          value={dishValue.title}
          onChange={(e) => setDishValue({ ...dishValue, title: e.target.value })}
          placeholder={placeholderTitle ? placeholderTitle : ''}
        />
      </Form.Item>
      <Form.Item label="Порция в, г">
        <Input
          value={dishValue.portion}
          onChange={(e) => setDishValue({ ...dishValue, portion: e.target.value })}
          placeholder={placeholderPortion ? placeholderPortion : ''}
        />
      </Form.Item>
      <Form.Item name="img" style={{ width: '100%' }}>
        <label className={styles.imgLabel}>Загрузить фото</label>
        <div className={styles.uploadBtn}>
          <UploadOutlined />
          <input ref={inputRef} type="file" onChange={selectFiles} />
        </div>
        {(fileName || dishValue.img) && (
          <div className={styles.fileWrapper}>
            <span>{fileName}</span>
            <CloseCircleOutlined onClick={() => removeImg()} />
          </div>
        )}
      </Form.Item>
    </Form>
  );
};
