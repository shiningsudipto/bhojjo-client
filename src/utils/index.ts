import { TCategory } from "../types";

export const transformCategoriesIntoOptions = (categories: TCategory[]) => {
  return categories?.map((item) => ({
    label: item?.category,
    value: item?.category,
  }));
};
