import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  tagTypes: ["Transaction"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6710f03da85f4164ef300874.mockapi.io/api/",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as { auth: { token: string } }).auth.token ||
        localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/datatrans",
    }),
    createTransaction: builder.mutation({
      query: (body) => ({
        url: "/datatrans",
        method: "POST",
        body,
      }),
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/datatrans/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/datatrans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
