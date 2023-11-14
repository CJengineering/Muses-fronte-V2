// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Data } from 'src/app/interfaces';
// interface ApiTest {
//   message: string;
// }
// export const testApi = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000' }),
//   endpoints: (builder) => ({
//     getSimpleTest: builder.query<ApiTest, string>({
//       query: () => `/`,
//     }),
//     getArticles: builder.query<Data[], string>({
//       query: () => `/articles`,
//     }),
//   }),
// });
// export const { useGetSimpleTestQuery,useGetArticlesQuery } = testApi;
// export default testApi.reducer;
// export const { getSimpleTest, getArticles } = testApi.endpoints;
