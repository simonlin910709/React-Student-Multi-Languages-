import Header from 'layout/Header';
import CreateStudent from 'components/CreateStudent';
import './App.css';
import useWindowSize from 'hooks/useWindowSize';
import { useState } from 'react';
import Student from 'interfaces/Student';
import { AppContext } from 'context/AppContext';
import TableContent from 'components/TableContent';
import { Space } from 'antd';

const App: React.FC = () => {
  const size = useWindowSize();
  const isMobile = size.width < 768;
  const [studentList, setStudentList] = useState<Student[]>([]);

  return (
    <AppContext.Provider value={{ studentList, setStudentList, isMobile }}>
      <Header />
      <div className={'main-content' + (isMobile ? ' mobile' : '')}>
        <Space direction='vertical' size='large' style={{ display: 'flex' }}>
          <CreateStudent />
          <TableContent />
        </Space>
      </div>
    </AppContext.Provider>
  );
};

export default App;
