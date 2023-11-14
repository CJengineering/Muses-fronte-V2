import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type NewTableStatus =  'incoming'|'archived'|'published'|'shortlist';
export interface NewTableState {
  status: 'incoming'|'archived'|'published'|'shortlist';
}

export const initialState: NewTableState = {
  status: 'incoming',
};

const newTableSlice = createSlice({
  name: 'newtable',
  initialState,
  reducers: {
    selectedNewTableValue(state, action: PayloadAction<NewTableStatus>) {
      state.status = action.payload;
    },
  },
});
export const { selectedNewTableValue } = newTableSlice.actions;
export default newTableSlice.reducer;
