import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGroupJoinRequests } from "../services/api";
import TableRow from "./TableRow";

const RequestComponent = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["requests"],
    queryFn: getGroupJoinRequests,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading requests</p>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-zinc-800 text-zinc-200">
        <thead className="bg-zinc-900">
          <tr>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Group</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <TableRow key={row._id} data={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestComponent;
