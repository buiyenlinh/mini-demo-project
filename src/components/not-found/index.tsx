import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <h1 className="font-bold text-[20px] mb-2">
            This page could not be found.
          </h1>
          <Link to="/">
            <Button className="buttons-container-button">
              <span className="font-bold text-base">Go to user list</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
