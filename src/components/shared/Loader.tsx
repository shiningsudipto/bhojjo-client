import { Spinner } from "@material-tailwind/react";
const Loader = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner className="h-16 w-16 text-gray-900/50" />
    </div>
  );
};

export default Loader;
