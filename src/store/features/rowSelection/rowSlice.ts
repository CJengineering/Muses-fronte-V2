import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  selectedRows: [] as number[],
};

const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    toggleSelectedRow: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.selectedRows.includes(id)) {
        state.selectedRows = state.selectedRows.filter(rowId => rowId !== id);
      } else {
        state.selectedRows.push(id);
      }
    },
    clearSelectedRows: (state) => {
      state.selectedRows = [];
    },
    resetAndAddRows: (state, action: PayloadAction<number[]>) => {
      state.selectedRows = [];
      state.selectedRows.push(...action.payload); 
    },
  },
});

export const { toggleSelectedRow, clearSelectedRows, resetAndAddRows } = rowsSlice.actions;
export default rowsSlice.reducer;
