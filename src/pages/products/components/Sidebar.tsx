import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../../redux/features/category";
import { Radio } from "@material-tailwind/react";
import { TCategory } from "../../../types";
import { Range } from "react-range";
import { useState } from "react";

const sortOrders = [
  {
    value: "asc",
    label: "Low to high",
  },
  {
    value: "desc",
    label: "Hight to low",
  },
];

const Sidebar = () => {
  const { data } = useGetAllCategoryQuery("");
  const categoryData = data?.data as TCategory[];
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState([50]);

  // Helper to set query params
  const handleFilterChange = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    navigate(`?${searchParams.toString()}`);
  };
  return (
    <div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Category</p>
        {categoryData?.map((item) => (
          <Radio
            value={item?.category}
            onClick={(e) => handleFilterChange("category", e.target.value)}
            crossOrigin={""}
            key={item?._id}
            name="type"
            label={item?.category}
          />
        ))}
      </div>
      <div>
        <p className="text-lg font-semibold mb-3">Price</p>
        <div className="flex items-center gap-3">
          <p>0</p>
          <Range
            step={1}
            min={0}
            max={100}
            values={values}
            onChange={(newValues) => setValues(newValues)}
            onFinalChange={(newValues) =>
              handleFilterChange("maxPrice", (newValues[0] * 50).toString())
            }
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                    (values[0] / 100) * 100
                  }%, #ccc ${(values[0] / 100) * 100}%, #ccc 100%)`,
                  borderRadius: "3px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "18px",
                  width: "18px",
                  backgroundColor: "#3b82f6",
                  border: "2px solid #ffffff",
                  borderRadius: "50%",
                  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
                }}
              />
            )}
          />
          <p>{values[0] * 50}</p>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <p className="text-lg font-semibold">Sort by</p>
        {sortOrders?.map((item) => (
          <Radio
            defaultChecked={item?.value === "asc"}
            value={item?.value}
            onClick={(e) => handleFilterChange("sortOrder", e.target.value)}
            crossOrigin={""}
            key={item?.value}
            name="type"
            label={item?.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
