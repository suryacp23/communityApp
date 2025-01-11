import Event from "./Event";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../services/api.js";
import Spinner from "./Spinner.jsx";

const EventList = () => {
  const { isLoading, error, isError, data } = useQuery({
    queryKey: ["events"],
    queryFn: fetchBlogs,
  });

  if (isLoading || isError) {
    return (
      <div className="h-screen flex justify-center items-center backdrop-blur-3xl">
        <Spinner />
      </div>
    );
  }

  const events = data?.events || [];
  return (
    <div className="w-full h-auto p-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {events?.map((event) => (
        <Event event={event} key={event?._id} />
      ))}
    </div>
  );
};

export default EventList;
