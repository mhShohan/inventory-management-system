import { baseApi } from "../baseApi";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPurchases: builder.query({
      query: () => ({
        url: '/purchases',
        method: 'GET'
      }),
      providesTags: ['purchases']
    }),
    createPurchase: builder.mutation({
      query: (payload) => ({
        url: '/purchases',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['purchases']
    }),
  })
})

export const { useGetAllPurchasesQuery, useCreatePurchaseMutation } = purchaseApi