/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnyAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { DashBoardGateway } from 'src/app/interfaces';
import { AppState } from 'src/store';
import { dashboardFetched } from './dashboardSlice';

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
