import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import styles from './AddDishForm.module.scss';

const AddDishForm: React.FC = (): JSX.Element => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [dishValue, setDishValue] = useState<{ title: string; portion: string; img: string | ArrayBuffer | null }>({
    title: '',
    portion: '',
    img: '',
  });
  const [form] = Form.useForm();

  const getBase64 = (img: File): any => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      setDishValue({ ...dishValue, img: reader.result });
    };
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  // const beforeUpload = (file: File): boolean => {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload JPG/PNG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // };
  const handleChange = (info: any): void => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };

  useEffect(() => {
    console.log('fileList', fileList);
  }, [fileList]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      // onValuesChange={onRequiredTypeChange}
    >
      <Form.Item label="Название блюда" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Порция в, г" name="portion">
        <Input />
      </Form.Item>
      <Form.Item name="img" style={{ width: '100%' }}>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
            Upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDishForm;
