import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type LoaderStatus =  boolean;
export interface LoaderState {
  status:  boolean;
}

export const initialState: LoaderState = {
  status: false,
};

const loadSlice = createSlice({
  name: 'loadValue',
  initialState,
  reducers: {
    loadValueSelected(state, action: PayloadAction<LoaderStatus>) {
      state.status =  action.payload;
    },
  },
});
export const { loadValueSelected } = loadSlice.actions;
export default loadSlice.reducer;