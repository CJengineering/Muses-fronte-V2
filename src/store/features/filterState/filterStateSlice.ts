import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  status: boolean;
}

export const initialState: FilterState = {
  status: false,
};

const filterStateSlice = createSlice({
  name: 'filterState',
  initialState,
  reducers: {
    filterStateChanged(state, action: PayloadAction<boolean>) {
      state.status = action.payload;
    },
  },
});
export const { filterStateChanged} =  filterStateSlice.actions;
export default  filterStateSlice.reducer;
