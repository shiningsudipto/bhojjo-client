import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bhojjo-backend.vercel.app/api",
    // baseUrl: "http://localhost:5000/api",
    // credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;

    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  tagTypes: ["Category", "Product", "User", "Package"],
  endpoints: () => ({}),
});

export default baseApi;
