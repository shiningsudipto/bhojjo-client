import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `/category`,
      providesTags: ["Category"],
    }),
    sendOTP: builder.mutation({
      query: (userData) => ({
        url: "/auth/otp",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useSendOTPMutation, useLoginMutation } = userApi;
