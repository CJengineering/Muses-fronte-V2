/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnyAction, Dispatch, ThunkAction } from '@reduxjs/toolkit';
import { ArticleGateway } from 'src/app/interfaces';
import { AppState } from 'src/app/store';
import { articlesFetched } from 'src/features/articles/articlesSlice';
import { TableStatus } from 'src/features/table/tableSlice';

type ThunkResult<D> = ThunkAction<void, AppState, D, AnyAction>;

export const fetchArticles = (): ThunkResult<{
  articleGateway: ArticleGateway;
}> => {
  return async (dispatch: Dispatch<any>, getState, { articleGateway }) => {
    console.log('fetchArticles thunk is executing');

    try {
      const articles = await articleGateway.fetchArticles();
      console.log('Fetched articles:', articles);

      dispatch(articlesFetched(articles));
      console.log('Dispatching articlesFetched:', articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
};
