/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnyAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { AppState } from 'src/app/store';
import { articlesFetched } from 'src/features/articles/articlesSlice';
import { TableStatus } from 'src/features/table/tableSlice';
import { DashBoardGateway } from 'src/app/interfaces';
import { dashboardFetched } from 'src/features/dashboard/dashboardSlice';

type ThunkResult<D> = ThunkAction<void, AppState, D, AnyAction>;

export const fetchDashboard = (): ThunkResult<{
  dashboardGateway: DashBoardGateway;
}> => {
  return async (dispatch: Dispatch<any>, getState, { dashboardGateway }) => {
    console.log('dashboard thunk is executing');
    const dashboardCount = await dashboardGateway.fetchDashboard();
    console.log('Fetched dashboard:', dashboardCount);
    dispatch(dashboardFetched(dashboardCount));
  };
};
