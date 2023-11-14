import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectAllState {
  status: boolean;
}

export const initialState: SelectAllState = {
  status: false,
};

const selectAllSlice = createSlice({
  name: 'selectAll',
  initialState,
  reducers: {
    allSelected(state, action: PayloadAction<boolean>) {
      state.status = action.payload;
    },
  },
});
export const { allSelected} =  selectAllSlice.actions;
export default  selectAllSlice.reducer;