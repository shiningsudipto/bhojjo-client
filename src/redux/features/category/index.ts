import baseApi from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `/category`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (couponData) => ({
        url: "/category",
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoryQuery, useCreateCategoryMutation } =
  categoryApi;
