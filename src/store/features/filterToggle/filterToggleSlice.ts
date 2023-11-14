import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterToggleState {
  status: boolean;
}

export const initialState: FilterToggleState = {
  status: false,
};

const filterToggleSlice = createSlice({
  name: 'filterTogle',
  initialState,
  reducers: {
    filterToggled(state, action: PayloadAction<boolean>) {
      state.status = action.payload;
    },
  },
});
export const { filterToggled } =  filterToggleSlice.actions;
export default  filterToggleSlice.reducer;
