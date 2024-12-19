import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams({
          ...(params.category && { category: params.category }),
          ...(params.searchTerm && { searchTerm: params.searchTerm }),
          sortBy: "price",
          ...(params.sortOrder && { sortOrder: params.sortOrder }),
          ...(params.minPrice && { minPrice: 0 }),
          ...(params.maxPrice && { maxPrice: params.maxPrice }),
        }).toString();
        return `/product?${queryString}`;
      },
      providesTags: ["Product"],
    }),
    getAllProductForAdmin: builder.query({
      query: () => `/product/all`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (productData) => ({
        url: "/product",
        method: "DELETE",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useCreateProductMutation,
  useGetAllProductForAdminQuery,
  useDeleteProductMutation,
} = productApi;
