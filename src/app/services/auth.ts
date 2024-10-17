import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "regresApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as { auth: { token: string } }).auth.token ||
        localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers; // Kembalikan headers yang sudah disiapkan
    },
  }),
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    authRegister: builder.mutation({
      query: (body) => ({
        url: "/users/",
        method: "POST",
        body,
      }),
    }),

    getProfile: builder.query({
      query: () => "/auth/profile",
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useGetProfileQuery,
} = authApi;
