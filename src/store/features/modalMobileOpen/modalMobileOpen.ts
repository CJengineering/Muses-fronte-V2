import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface modalMobileOpenState {
  status: boolean;
  statusKeyword: boolean;
}

export const initialState: modalMobileOpenState = {
  status: false,
  statusKeyword: false
};

const modalMobileOpenSlice = createSlice({
  name: 'modalMobileOpen',
  initialState,
  reducers: {
    modalMobileOpend(state, action: PayloadAction<boolean>) {
      state.status = action.payload;
    },
    modalMobileForKeywordOpend(state, action: PayloadAction<boolean>) {
        state.statusKeyword = action.payload;
      },
  },
});
export const { modalMobileOpend, modalMobileForKeywordOpend } =  modalMobileOpenSlice.actions;
export default  modalMobileOpenSlice.reducer;
