import { baseApi } from "../baseApi";

const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSeller: builder.query({
      query: (query) => ({
        url: '/sellers',
        method: 'GET',
        params: query
      }),
      providesTags: ['seller']
    }),
    createSeller: builder.mutation({
      query: (payload) => ({
        url: '/sellers',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['seller']
    }),
    deleteSeller: builder.mutation({
      query: (id) => ({
        url: '/sellers/' + id,
        method: 'DELETE'
      }),
      invalidatesTags: ['seller']
    }),
  })
})

export const { useGetAllSellerQuery, useCreateSellerMutation, useDeleteSellerMutation } = sellerApi