import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/user-by-id/${id}`,
      providesTags: ["User"],
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
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/update-user/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useSendOTPMutation,
  useLoginMutation,
  useUpdateUserMutation,
} = userApi;
