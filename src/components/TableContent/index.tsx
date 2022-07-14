import {
  Button,
  Card,
  Checkbox,
  Form,
  FormInstance,
  InputNumber,
  Space,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { AppContext, AppContextProps } from 'context/AppContext';
import FilterData from 'interfaces/FilterData';
import Student from 'interfaces/Student';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TableContent: React.FC = () => {
  const { studentList, setStudentList, isMobile } =
    useContext<AppContextProps>(AppContext);
  const { t } = useTranslation();
  const formRef = React.createRef<FormInstance>();
  const [filterScoreFrom, setFilterScoreFrom] = useState<number | null>(null);
  const [filterScoreTo, setFilterScoreTo] = useState<number | null>(null);
  const [filterClass, setFilterClass] = useState<string[]>([]);
  const columns: ColumnsType<Student> = [
    {
      title: t('label.studentName'),
      dataIndex: 'name',
    },
    {
      title: t('label.score'),
      dataIndex: 'score',
    },
    {
      title: t('label.class'),
      dataIndex: 'class',
    },
    {
      title: '',
      render: _ => (
        <Button
          type='primary'
          danger
          size='small'
          onClick={() => onDeleteStudent(_)}
        >
          {t('label.delete')}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    window.addEventListener('CLEAR_FILTER', onClearFilter);

    return () => {
      window.removeEventListener('CLEAR_FILTER', onClearFilter);
    };
  }, [formRef]);

  const testFilter = (student: Student) => {
    if (filterScoreFrom && student.score < filterScoreFrom) return false;
    if (filterScoreTo && student.score > filterScoreTo) return false;
    if (filterClass.length !== 0 && filterClass.indexOf(student.class) === -1)
      return false;

    return true;
  };

  const getStudentList = useMemo(() => {
    return studentList.filter(student => testFilter(student));
  }, [filterScoreFrom, filterScoreTo, filterClass, studentList]);

  const onDeleteStudent = (student: Student) => {
    const findIndex = studentList.findIndex(item => item.key === student.key);
    studentList.splice(findIndex, 1);
    setStudentList([...studentList]);
  };

  const onFilter = (values: FilterData) => {
    setFilterScoreFrom(values.scoreFrom);
    setFilterScoreTo(values.scoreTo);
    setFilterClass(values.class);
  };

  const onClearFilter = () => {
    formRef.current?.setFieldsValue({
      scoreFrom: null,
      scoreTo: null,
      class: [],
    });
    setFilterScoreFrom(null);
    setFilterScoreTo(null);
    setFilterClass([]);
  };

  return (
    <Card>
      <Space
        direction='vertical'
        size={isMobile ? 'small' : 'large'}
        style={{ display: 'flex' }}
      >
        <Form
          ref={formRef}
          layout={isMobile ? 'vertical' : 'inline'}
          onFinish={onFilter}
        >
          <Form.Item label={t('label.scoreFrom')} name='scoreFrom'>
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label={t('label.scoreTo')} name='scoreTo'>
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label={t('label.class')} name='class'>
            <Checkbox.Group>
              <Checkbox value='A'>A</Checkbox>
              <Checkbox value='B'>B</Checkbox>
              <Checkbox value='C'>C</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>
                {t('label.filter')}
              </Button>
              <Button onClick={onClearFilter}>{t('label.clear')}</Button>
            </Space>
          </Form.Item>
        </Form>
        <Table
          bordered
          columns={columns}
          dataSource={getStudentList}
          scroll={{ x: '100%' }}
        />
      </Space>
    </Card>
  );
};

export default TableContent;
