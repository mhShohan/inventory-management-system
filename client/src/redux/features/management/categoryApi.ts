import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET'
      }),
      providesTags: ['category']
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: '/categories',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['category']
    }),
  })
})

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } = categoryApi