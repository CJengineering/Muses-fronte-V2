// ** Toolkit imports
import {combineReducers, configureStore } from '@reduxjs/toolkit'
//** Custom reducers  */
import articlesReducer from './features/articles/articlesSlice';
import tableReducer from './features/table/tableSlice';
import postsReducer from './features/posts/postsSlice';
import filterStateReducer from './features/filterState/filterStateSlice';
import searchAttributesReducer from './features/searchAttributes/searchAttributesSlice';
import actionStateReducer from './features/actionState/actionStateSlice'
import selectAllReducer from './features/SelectAll/selectAllSlice'
import modalMobileOpenReducer from './features/modalMobileOpen/modalMobileOpen'
import  searchBarReducer from './features/searchBar/searchBarSlice'
import loaderValueReducer from './features/Loader/loaderSlice'
import rowsReducer from './features/rowSelection/rowSlice'
import newTableReducer from './features/new table selctor/newTableSlice';
import filterToggleReducer from './features/filterToggle/filterToggleSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';
import { InMemoryDashBoardGateway } from './features/dashboard/InMemoryDashBoardGateway';
import modalStateReducer from "./features/modalStates/modalStateSlice";
import {
  ApiArticleGateway,
  InMemoryArticleGateway,
} from './features/articles/InMemoryArticleGateway';
import filterToggleSlice from './features/filterToggle/filterToggleSlice';
import { ApiPostGateway } from './features/posts/postsGateway';
import searchAttributesSlice from './features/searchAttributes/searchAttributesSlice';
import modalMobileOpen from './features/modalMobileOpen/modalMobileOpen';
// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
export const rootReducer = combineReducers({
  table: tableReducer,
  articles: articlesReducer,
  dashboard: dashboardReducer,
  filterToggle: filterToggleReducer,
  filterState: filterStateReducer,
  posts: postsReducer,
  newtable: newTableReducer,
  searchAttribute: searchAttributesReducer,
  rows: rowsReducer,
  actionState: actionStateReducer,
  selectAll: selectAllReducer,
  searchBar : searchBarReducer,
  modalMobileOpen: modalMobileOpenReducer,
  loadValue: loaderValueReducer,
  modalState: modalStateReducer,
  

});
export type AppState = ReturnType<typeof rootReducer>;

export const buildInitStore = (): AppState => ({
  table: { status: 'pending' },
  articles: { ids: [], articles: {} },
  dashboard: { dashboardData: [] },
  filterToggle: { status: false },
  filterState: { status: false },
  posts: { ids: [], posts: {} },
  newtable: { status: 'incoming' },
  searchAttribute: {source: ['bing','custom','google','google_alert'], score:[0,100], keywords:[] },
  rows: {selectedRows:[]},
  actionState: {status:'archive'},
  selectAll: {status: false},
  searchBar : {status:''},
  modalMobileOpen: {status: true, statusKeyword: true},
  loadValue: { status: false},
  modalState: {statusKeywordEdit: false},
});
// export const storeInital = configureStore({
//   reducer: {
//     user,
//     chat,
//     email,
//     invoice,
//     calendar,
//     permissions
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false
//     })
// })
export const createStore = (dependencies: unknown, hydrate?: AppState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: dependencies } }),
    preloadedState: hydrate ?? buildInitStore(),
  });
const postGateway = new ApiPostGateway();
const articleGateway = new ApiArticleGateway();
const dashboardGateway = new InMemoryDashBoardGateway();
export const store = createStore({
  dashboardGateway,
  articleGateway,
  postGateway,
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
