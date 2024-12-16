import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const  baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/items`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token =  localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery,
    tagTypes: ['Items'],
    endpoints: (builder) =>({
        fetchAllitems: builder.query({
            query: () => "/",
            providesTags: ["Items"]
        }),
        fetchitemById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "items", id }],
        }),
        additem: builder.mutation({
            query: (newitem) => ({
                url: `/create-item`,
                method: "POST",
                body: newitem
            }),
            invalidatesTags: ["items"]
        }),
        updateitem: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["items"]
        }),
        deleteitem: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["items"]
        })
    })
})

export const {useFetchAllitemsQuery, useFetchitemByIdQuery, useAdditemMutation, useUpdateitemMutation, useDeleteitemMutation} = itemsApi;
export default itemsApi;