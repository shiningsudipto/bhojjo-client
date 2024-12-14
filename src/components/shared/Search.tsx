import { Input } from "@material-tailwind/react";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Helper to set query params
  const handleFilterChange = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    navigate(`?${searchParams.toString()}`);
  };
  return (
    <>
      <IoSearchOutline className="absolute text-xl right-1 top-[10px]" />
      <Input
        onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
        color="white"
        label="Search"
        crossOrigin=""
        className="pe-7 min-w-[350px]"
      />
    </>
  );
};

export default Search;
