import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getgroups } from "../services/api";
import EventCard from "./EventCard";

const MyGroups = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["getgroups"],
    queryFn:()=> getgroups("admin"),
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error?.response?.data?.message}</p>;

  if (data?.message) return <p>{data.message}</p>; // Show "no group found" message

  return (
    <div className="p-6 space-y-8">
      {data.length > 0 ? (
        data.map((event) => <EventCard key={event._id} event={event} />)
      ) : (
        <p>No groups available.</p>
      )}
    </div>
  );
};

export default MyGroups;
