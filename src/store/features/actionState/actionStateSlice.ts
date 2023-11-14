import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type ActionStatus =  'archive'|'shortlist'|'webflow'|'analyse';
export interface ActionState {
  status:  'archive'|'shortlist'|'webflow'|'analyse';
}

export const initialState: ActionState = {
  status: 'archive',
};

const actionStateSlice = createSlice({
  name: 'actionState',
  initialState,
  reducers: {
    actionSelected(state, action: PayloadAction<ActionStatus>) {
      state.status = action.payload;
    },
  },
});
export const { actionSelected } = actionStateSlice.actions;
export default actionStateSlice.reducer;
