import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IconType, SearchFilterAttribute } from 'src/app/interfaces';

const initialState: SearchFilterAttribute = {
  source: ['bing','custom','google','google_alert'],
  keywords: [],
};
const searchAttributeSlice = createSlice({
  name: 'searchAttribute',
  initialState,
  reducers: {
    sourceAttributedToggled(state, action: PayloadAction<IconType[]>) {
      state.source = action.payload;
    },
    keywordsAttributesSelected(state, action: PayloadAction<string>) {
      if (state.keywords) {
        state.keywords = [...state.keywords, action.payload];
      } else {
        state.keywords = [action.payload];
      }
    },
    keywordRemoved(state, action: PayloadAction<string>) {
      state.keywords = state.keywords?.filter(
        (keyword) => keyword !== action.payload
      );
    },
    dateStartAttributesSelected(state, action: PayloadAction<string>) {
      if (action.payload) {
        state.dateStart = new Date(action.payload);
      }
    },
    dateEndAttributesSelected(state, action: PayloadAction<string>) {
      if (action.payload) {
        state.dateEnd = new Date(action.payload);
      }
    },
    scoreAttributesSelected(state, action: PayloadAction<[number, number]>) {
      state.score = action.payload;
    },
    sourceAttributedRemoved(state, action: PayloadAction<string>) {
      state.source = state.source?.filter((item) => item !== action.payload);
    },
  },
});

export const {
  scoreAttributesSelected,
  keywordsAttributesSelected,
  dateStartAttributesSelected,
  dateEndAttributesSelected,
  sourceAttributedToggled: sourceAttributedToggled,
  keywordRemoved,
  sourceAttributedRemoved,
} = searchAttributeSlice.actions;

export default searchAttributeSlice.reducer;
