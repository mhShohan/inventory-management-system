import { baseApi } from "./baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: '/brands',
        method: 'GET'
      }),
      providesTags: ['brand']
    }),
  })
})

export const { useGetAllBrandsQuery } = brandApi