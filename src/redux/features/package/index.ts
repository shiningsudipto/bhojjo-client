import baseApi from "../../api/baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackageByUser: builder.query({
      query: (id) => `/package/${id}`,
      providesTags: ["Package"],
    }),
    createPackage: builder.mutation({
      query: (packageData) => ({
        url: "/package",
        method: "POST",
        body: packageData,
      }),
      invalidatesTags: ["Package"],
    }),
    updatePackage: builder.mutation({
      query: (packageData) => ({
        url: "/package",
        method: "PUT",
        body: packageData,
      }),
      invalidatesTags: ["Package"],
    }),
    deletePackage: builder.mutation({
      query: (packageData) => ({
        url: "/package",
        method: "DELETE",
        body: packageData,
      }),
      invalidatesTags: ["Package"],
    }),
    getPackageItemsByPackage: builder.query({
      query: (id) => `/package/item/${id}`,
      providesTags: ["Package"],
    }),
    addItemIntoPackage: builder.mutation({
      query: (itemData) => ({
        url: "/package/item",
        method: "POST",
        body: itemData,
      }),
      invalidatesTags: ["Package"],
    }),
    updatePackageItem: builder.mutation({
      query: (itemData) => ({
        url: `/package/item`,
        method: "PUT",
        body: itemData,
      }),
      invalidatesTags: ["Package"],
    }),
    deletePackageItem: builder.mutation({
      query: (itemData) => ({
        url: `/package/item`,
        method: "DELETE",
        body: itemData,
      }),
      invalidatesTags: ["Package"],
    }),
  }),
});

export const {
  useGetAllPackageByUserQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useGetPackageItemsByPackageQuery,
  useAddItemIntoPackageMutation,
  useUpdatePackageItemMutation,
  useDeletePackageItemMutation,
} = packageApi;
