import { stat } from 'fs';
import {
  Article,
  DashboardData,
  IconType,
  Post,
  RowNewProps,
  SearchFilterAttribute,
} from 'src/app/interfaces';
import { RootState } from '..';


export const createPresentation = (state: RootState) => {
  return { status: state.table.status };
};
export const createPresentationLoading = (state: RootState) => {
  return state.loadValue.status;
};
export const createPresentationNewTab = (state: RootState) => {
  return { status: state.newtable.status };
};
export type PresentationArticles = {
  articles: Record<number, Article>;
  ids: number[];
};
export type PresentationSearchBar = {
  label: string;
  title: string;
};
export type PresentationPosts = {
  posts: Record<number, Post>;
  ids: number[];
};
export type PrsentationFilterToggle = {
  status: boolean;
};
export type PrsentationMobileOpen = {
  status: boolean;
  statusKeyword: boolean;
}
export type PresentationFilterState = {
  status: boolean;
};
export type PresentationDashboardData = {
  dashboard: DashboardData[];
};
export const createPresentationFilterToggle = (
  state: RootState
): PrsentationFilterToggle => {
  return { status: state.filterToggle.status };
};
export const createPresentatioModalState = (state: RootState) => {
  return { statusKeywordEdit: state.modalState.statusKeywordEdit };
}
export const createPresentationSelectAll = (state: RootState) => {
  return { status: state.selectAll.status };
};
export const createPresentationFilterState = (
  state: RootState
): PresentationFilterState => {
  return { status: state.filterState.status };
};
export const createPresentationArticles = (
  state: RootState
): PresentationArticles => {
  return { articles: state.articles.articles, ids: state.articles.ids };
};
export const createPresentationDashboardData = (
  state: RootState
): PresentationDashboardData => {
  return { dashboard: state.dashboard.dashboardData };
};
export const createPresentationPosts = (state: RootState): RowNewProps[] => {
  const presentationPosts: RowNewProps[] = [];

  const { ids, posts } = state.posts;

  ids.forEach((id) => {
    const post = posts[id];

    let source: IconType;
    source = post.source as IconType;

    presentationPosts.push({
      id: post.id,
      title: post.title,
      link: post.link,
      date: new Date(post.created_at),
      keyword: post.key_word.key_word,
      score: post.score,
      source: source,
      comments: post.comments,
    });
  });

  return presentationPosts;
};

export const createPresentationSearchAttributes = (state: RootState) => {
  return { searchAttributes: state.searchAttribute };
};
export const createPresentationSelectedRows = (state: RootState) => {
  return { selectedRows: state.rows.selectedRows };
};
export const createPresentationSearchBar = (state: RootState) => {
  return { status: state.searchBar.status };
};
export const createPresentationBulkAction = (state: RootState) => {
  return { status: state.actionState.status };
};
export const createPresentationDataForSearchBar = (
  state: RootState
): string[] => {
  const dataSearch: Set<string> = new Set();
  const { ids, posts } = state.posts;
  ids.forEach((id) => {
    const post = posts[id];
    dataSearch.add(post.key_word.key_word);
    dataSearch.add(post.title);
  });
  return Array.from(dataSearch)
};
export const createPresentationMobileOpenStatus = (
  state: RootState
): PrsentationMobileOpen => {
  return { status: state.modalMobileOpen.status, statusKeyword: state.modalMobileOpen.statusKeyword };
};