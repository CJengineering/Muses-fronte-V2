import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type TableStatus =  'pending'|'archived'|'published';
export interface TableState {
  status: 'pending'|'archived'|'published';
}

export const initialState: TableState = {
  status: 'pending',
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    selectedTableValue(state, action: PayloadAction<TableStatus>) {
      state.status = action.payload;
    },
  },
});
export const { selectedTableValue } = tableSlice.actions;
export default tableSlice.reducer;
