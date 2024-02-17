import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../utils/config";
import { logoutUser } from "../services/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})

const customBaseQuery: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    window.location.href = '/login'
    api.dispatch(logoutUser())
  }

  return result
}


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: customBaseQuery,
  tagTypes: ['product', 'sale', 'user', 'category', 'brand', 'seller', 'purchases'],
  endpoints: () => ({})
})