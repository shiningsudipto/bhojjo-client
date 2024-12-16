import { Input } from "@material-tailwind/react";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("searchTerm") || "";
  // Helper to set query params
  const handleFilterChange = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    if (location.pathname === "/") {
      navigate("/shop");
    }
    searchParams.set(key, value);
    navigate(`?${searchParams.toString()}`);
  };
  return (
    <>
      <IoSearchOutline className="absolute text-xl right-1 top-[10px]" />
      <Input
        value={searchTerm}
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

{
  /* <button className="absolute right-0 rounded-md px-2 gap-2 flex items-center bg-primary-600 h-full cursor-pointer">
<IoSearchOutline className="text-xl" />
Search
</button> */
}
