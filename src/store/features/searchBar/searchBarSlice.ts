import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchBarState {
  status: string;
}

export const initialState: SearchBarState = {
  status: '',
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    searchBarSet(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
});
export const { searchBarSet } = searchBarSlice.actions;
export default searchBarSlice.reducer;
