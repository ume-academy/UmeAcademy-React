import React, { createContext, useContext, useEffect, useState } from 'react';

// Định nghĩa kiểu cho context
export interface ModeUserType {
  mode: 'student' | 'teacher';
  toggleMode: () => void;
}

// Khởi tạo context với giá trị mặc định ban đầu
export const ModeUserContext = createContext({} as ModeUserType);

export const useMode = () => {
  const context = useContext(ModeUserContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};


export const ModeProvider = ({ children }: {children: React.ReactNode}) => {
    const [mode, setMode] = useState<'student' | 'teacher'>(() => {
        // Lấy mode từ localStorage nếu có, nếu không thì mặc định là 'student'
        const savedMode = localStorage.getItem('mode');
        return (savedMode as 'student' | 'teacher') || 'student';
      });
    
      useEffect(() => {
        // Lưu mode vào localStorage khi nó thay đổi
        localStorage.setItem('mode', mode);
      }, [mode]);
    
      // Hàm chuyển đổi giữa teacher và student
      const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'student' ? 'teacher' : 'student'));
      };

  return (
    <ModeUserContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeUserContext.Provider>
  );
};
