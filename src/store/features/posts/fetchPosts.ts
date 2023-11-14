/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnyAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { PostGateway } from 'src/app/interfaces';

import { postsFetched } from './postsSlice';
import { NewTableStatus } from '../new table selctor/newTableSlice';
import { AppState } from 'src/store';

type ThunkResult<D> = ThunkAction<void, AppState, D, AnyAction>;

export const fetchPosts = (url: NewTableStatus,id?:number): ThunkResult<{
  postGateway: PostGateway;
}> => {
  return async (dispatch: Dispatch<any>, getState, { postGateway }) => {
    console.log('fetchPosts thunk is executing');

    const posts = await postGateway.fetchPosts(url, id);
    console.log('Fetched posts:', posts);

    dispatch(postsFetched(posts));
    console.log('Dispatching postsFetched:', posts);
  };
};
