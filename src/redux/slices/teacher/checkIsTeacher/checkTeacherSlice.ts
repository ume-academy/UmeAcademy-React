import { TIsTeacher } from "@/interfaces/TTeacher";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: TIsTeacher = {
  is_teacher: false,
}


export const checkIsTeacherSlice = createSlice({
  name: 'isTeacher',
  initialState,
  reducers: {
    setIsTeacher: (state: TIsTeacher, action:PayloadAction<boolean>) => {
      console.log(action.payload);
      state.is_teacher = action.payload
      localStorage.setItem('isTeacher', JSON.stringify(action.payload))
      // // Khi ứng dụng load lại, khôi phục trạng thái từ localStorage
      // const savedIsTeacher = JSON.parse(localStorage.getItem('isTeacher') || 'false');
      // state.is_teacher = savedIsTeacher;
    }
  }
})

export const { setIsTeacher } = checkIsTeacherSlice.actions