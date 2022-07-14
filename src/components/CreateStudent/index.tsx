import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
} from 'antd';
import { AppContext, AppContextProps } from 'context/AppContext';
import Student from 'interfaces/Student';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

const CreateStudent: React.FC = () => {
  const { t } = useTranslation();
  const formRef = React.createRef<FormInstance>();

  const { isMobile, studentList, setStudentList } =
    useContext<AppContextProps>(AppContext);
  const formItemLayout = !isMobile
    ? {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      }
    : null;

  const onFinish = (student: Student) => {
    student.key = uuid();
    setStudentList([...studentList, student]);
    formRef.current?.setFieldsValue({
      name: '',
      score: 0,
      class: 'A',
    });
    const event = new Event('CLEAR_FILTER');
    window.dispatchEvent(event);
  };

  return (
    <Card>
      <Form
        name='student'
        {...formItemLayout}
        layout={isMobile ? 'vertical' : 'horizontal'}
        onFinish={onFinish}
        initialValues={{ score: 0, class: 'A' }}
        ref={formRef}
      >
        <Form.Item
          label={t('label.studentName')}
          name='name'
          rules={[
            { required: true, message: t('form.validate.inputStudentName') },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('label.score')}
          name='score'
          rules={[{ required: true, message: t('form.validate.inputScore') }]}
        >
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={t('label.class')}
          name='class'
          rules={[{ required: true, message: t('form.validate.selectClass') }]}
        >
          <Radio.Group>
            <Radio value='A'>A</Radio>
            <Radio value='B'>B</Radio>
            <Radio value='C'>C</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: isMobile ? 0 : 6 }}>
          <Button type='primary' htmlType='submit'>
            {t('label.createRecord')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateStudent;
