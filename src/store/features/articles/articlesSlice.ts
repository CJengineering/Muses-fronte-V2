import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from 'src/app/interfaces';
export const initialState: {
  ids: number[];
  articles: Record<number, Article>;
} = { ids: [], articles: {}}; // Initialize the sorting order


const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articlesFetched: (state, action: PayloadAction<Article[]>) => {
      console.log('articlesFetched reducer is called'); 
      for (const article of action.payload) {
        state.articles[article.id] = article;
      }
      state.ids = [...action.payload.map((article) => article.id)];
    },
    sortedByDate: (state, action: PayloadAction<'asc' | 'desc'>) => {
      const order = action.payload;
      const sortedIds = [...state.ids].sort((a, b) => {
        const dateA = new Date(state.articles[a].created_at);
        const dateB = new Date(state.articles[b].created_at);

        return order === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });

      // Update the ids to the new sorted order
      state.ids = sortedIds;
    },
    sortedByMainScore: (state, action: PayloadAction<'asc' | 'desc'>) => {
 
      const sortedRows = [...state.ids].sort((a, b) => {
        if (
          state.articles[a].score === null &&
          state.articles[b].score === null
        ) {
          return 0;
        } else if (state.articles[a].score === null) {
          return 1;
        } else if (state.articles[b].score === null) {
          return -1;
        } else {
          return (
            (state.articles[b]?.score ?? 0) - (state.articles[a]?.score ?? 0)
          );
        }
      });
      state.ids = sortedRows;
    },
    sortedByRelatedScore: (state, action: PayloadAction<'asc' | 'desc'>) => {
      const sortedRows = [...state.ids].sort((a, b) => {
        if (
          state.articles[a].score_second === null &&
          state.articles[b].score === null
        ) {
          return 0;
        } else if (state.articles[a].score_second === null) {
          return 1;
        } else if (state.articles[b].score_second === null) {
          return -1;
        } else {
          return (
            (state.articles[b]?.score_second ?? 0) - (state.articles[a]?.score_second ?? 0)
          );
        }
      });
      state.ids = sortedRows;
    },
  },
});

export const { articlesFetched, sortedByDate, sortedByMainScore, sortedByRelatedScore } =
  articlesSlice.actions;
export default articlesSlice.reducer;
