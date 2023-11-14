import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, SearchFilterAttribute } from 'src/app/interfaces';

export const initialState: {
  ids: number[];
  posts: Record<number, Post>;
} = { ids: [], posts: {} };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsFetched: (state, action: PayloadAction<Post[]>) => {
      console.log('postsFetched reducer is called');
      const newPosts: Record<number, Post> = {};
      for (const post of action.payload) {
        newPosts[post.id] = post;
      }
      state.posts= newPosts
      state.ids = [...action.payload.map((post) => post.id)];
    },
    postsFiltred: (state, action: PayloadAction<SearchFilterAttribute>) => {
      const { source, keywords, dateStart, dateEnd, score } = action.payload;

      if (
        (!source?.length ||
          !keywords?.length ||
          !dateStart ||
          !dateEnd ||
          !score) &&
        !source &&
        !keywords &&
        !dateStart &&
        !dateEnd &&
        !score
      ) {
        // If all filter attributes are empty, reset the state to initial state
        state.ids = initialState.ids;
        state.posts = initialState.posts;
        return;
      }

      state.ids = Object.values(state.posts)
        .filter((post) => {
          const sourceFilter =
            !source || !source.length || source.includes(post.source);
          const keywordsFilter =
            !keywords ||
            !keywords.length ||
            keywords.includes(post.key_word.key_word);
          const dateStartFilter =
            !dateStart || new Date(post.created_at) >= dateStart;
          const dateEndFilter = !dateEnd || new Date(post.created_at) <= dateEnd;
          const scoreFilter =
            !score || (post.score >= score[0] && post.score <= score[1]);

          return (
            sourceFilter &&
            keywordsFilter &&
            dateStartFilter &&
            dateEndFilter &&
            scoreFilter
          );
        })
        .map((post) => post.id);
    },
    postSortedByDate: (state, action: PayloadAction<boolean>) => {
      const order = action.payload;
      const sortedIds = [...state.ids].sort((a, b) => {
        const dateA = new Date(state.posts[a].created_at);
        const dateB = new Date(state.posts[b].created_at);

        return order === false
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });

      // Update the ids to the new sorted order
      state.ids = sortedIds;
    },
    selectedPostFiltred: (state, action: PayloadAction<number>) => {
      const postIdToDelete = action.payload;

      // Create a new object excluding the post with the specified ID
      const newPosts = Object.fromEntries(
        Object.entries(state.posts).filter(
          ([key, post]) => post.id !== postIdToDelete
        )
      );

      return {
        ...state,
        posts: newPosts,
        ids: state.ids.filter((id) => id !== postIdToDelete),
      };
    },
    postSortedByMainScore: (state, action: PayloadAction<boolean>) => {
      const isAscending = action.payload; 

      const sortedRows = [...state.ids].sort((a, b) => {
   
        const scoreA = state.posts[a]?.score ?? Number.MIN_SAFE_INTEGER;
        const scoreB = state.posts[b]?.score ?? Number.MIN_SAFE_INTEGER;

        if (isAscending) {
          return scoreA - scoreB;
        } else {
          return scoreB - scoreA;
        }
      });

      state.ids = sortedRows;
    },
  },
});
export const {
  postsFetched,
  postsFiltred,
  selectedPostFiltred,
  postSortedByDate,
  postSortedByMainScore
} = postsSlice.actions;
export default postsSlice.reducer;
