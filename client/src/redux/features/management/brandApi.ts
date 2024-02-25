import { baseApi } from "../baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: '/brands',
        method: 'GET'
      }),
      providesTags: ['brand']
    }),
    createBrand: builder.mutation({
      query: (payload) => ({
        url: '/brands',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['brand']
    }),
  })
})

export const { useGetAllBrandsQuery, useCreateBrandMutation } = brandApi