import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, DashboardData } from 'src/app/interfaces';

export const initialState: {
    dashboardData: DashboardData[];
  } = { dashboardData: [] };
  
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    dashboardFetched: (state, action: PayloadAction<DashboardData[]>) => {
    
     state.dashboardData = action.payload
    },
  },
});
export const { dashboardFetched } = dashboardSlice.actions;
export default dashboardSlice.reducer;





 