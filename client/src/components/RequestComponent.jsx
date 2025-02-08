import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGroupJoinRequests } from "../services/api";
import TableRow from "./TableRow";
import Spinner from "./Spinner";
import { useSocketContext } from "../context/socketContext";
import { useAuth } from "../hooks/useAuth";

const RequestComponent = () => {
  const { socket } = useSocketContext();
  const { user } = useAuth();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: getGroupJoinRequests,
  });
  useEffect(() => {
    socket?.emit("register_admin", user._id);

    socket?.on("new_request", (newRequest) => {
      console.log("New request received:", newRequest);
      refetch();
    });

    return () => {
      socket?.off("new_request");
    };
  }, []);

  if (error) return <p>Error loading requests</p>;
  return (
    <div className="overflow-x-auto">
      {isPending && (
        <div className="flex justify-center items-center h-screen w-screen">
          <Spinner />
        </div>
      )}
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
          {data?.length === 0 && (
            <tr>
              <td className="text-center" colSpan={6} height={50}>
                no requests found
              </td>
            </tr>
          )}
          {data?.map((row) => (
            <TableRow key={row._id} data={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestComponent;
