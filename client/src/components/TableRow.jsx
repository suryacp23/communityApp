import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatTimestamp } from "../utils/time";
import { FaXmark } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

const TableRow = ({ data }) => {
  const requestId = data?._id;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ requestId, action }) => approve({ requestId, action }),
    onMutate: async ({ requestId, action }) => {
      await queryClient.cancelQueries(["requests"]);

      const previousRequests = queryClient.getQueryData(["requests"]);

      queryClient.setQueryData(["requests"], (old) =>
        old.map((req) =>
          req._id === requestId
            ? { ...req, status: action === "approve" ? "approved" : "rejected" }
            : req
        )
      );

      return { previousRequests };
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message);
    },
    onError: (error, _, context) => {
      toast.error("Try again");
      queryClient.setQueryData(["requests"], context.previousRequests);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["requests"]);
    },
  });

  return (
    <tr className="border-b hover:bg-zinc-500 hover:text-black text-white">
      <td className="px-4 py-2">{data?.user?.userName}</td>
      <td className="px-4 py-2">{data?.user?.email}</td>
      <td className="px-4 py-2">{data?.group?.name}</td>
      <td className="px-4 py-2">{data?.status}</td>
      <td className="px-4 py-2">{formatTimestamp(data?.createdAt)}</td>
      <td className="text-center px-4 py-2">
        {data?.status === "pending" ? (
          <div className="flex gap-1 justify-around items-center">
            <button
              className="w-8 h-8 bg-black rounded-full flex justify-center items-center"
              onClick={() => mutate({ requestId, action: "approve" })}
            >
              <TiTick color="green" />
            </button>
            <button
              className="w-8 h-8 bg-black rounded-full flex justify-center items-center"
              onClick={() => mutate({ requestId, action: "reject" })}
            >
              <FaXmark color="red" />
            </button>
          </div>
        ) : (
          <p>{data?.status}</p>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
