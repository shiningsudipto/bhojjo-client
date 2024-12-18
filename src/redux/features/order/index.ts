import baseApi from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByUser: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: ["Order"],
    }),
    getAllOrders: builder.query({
      query: () => `/order`,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
    createOrderByCollection: builder.mutation({
      query: (orderData) => ({
        url: "/order/collection",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateOrderByCollectionMutation,
  useGetOrdersByUserQuery,
  useGetAllOrdersQuery,
} = orderApi;
