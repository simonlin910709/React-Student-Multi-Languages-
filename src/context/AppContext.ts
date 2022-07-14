import Student from 'interfaces/Student';
import React, { createContext } from 'react';

export type AppContextProps = {
  studentList: Student[];
  setStudentList: React.Dispatch<React.SetStateAction<Student[]>>;
  isMobile: boolean;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
