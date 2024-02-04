import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET'
      }),
      providesTags: ['category']
    }),
  })
})

export const { useGetAllCategoriesQuery } = categoryApi