import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getgroups } from "../services/api";
import EventCard from "./EventCard";

const MyGroups = () => {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["getgroups"],
    queryFn: getgroups,
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 space-y-8">
      {data.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default MyGroups;
