import React from "react";
import { joinRequests } from "../../test";
const Requests = () => {
  return (
    <div className="relative w-[80vw] h-[88vh] overflow-y-scroll shadow-md rounded-lg ">
      <table className="w-full text-sm  2xl:text-2xl text-left rtl:text-right text-gray-500">
        <thead classname="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="h-4 w-40 ">
            <th scope="col" className="px-6 py-3 ">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Group
            </th>
            <th className="px-6 py-3">Status</th>
            <th className="px-14 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {joinRequests?.map((request, i) => (
            <tr
              key={i}
              className=" odd:bg-gray-900 even:bg-slate-800 border-b  border-gray-700">
              <td className="px-6 py-4 2xl:px-9 2xl:py-6 ">{request.user}</td>
              <td className="px-6 py-4">{request.group}</td>
              <td className="px-6 py-4">{request.status}</td>
              <td className=" flex justify-around px-6 py-4">
                <button className="text-green-500" onClick={() => {}}>
                  Approve
                </button>
                <button className="text-red-500">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
