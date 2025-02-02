import { useState } from "react";
import GroupDetails from "./GroupDetails";
const GroupCard = ({ group, eventId }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleGroup = () => setExpanded(!expanded);

  return (
    <div className=" rounded p-4 bg-zinc-600 shadow-md my-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleGroup}
      >
        <div>
          <h4 className="text-lg font-medium">
            {group.name}
            {group.isHead && (
              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Head Group
              </span>
            )}
          </h4>
        </div>
        <span className="text-blue-600">{expanded ? "▼" : "▶"}</span>
      </div>
      {expanded && <GroupDetails group={group} />}
    </div>
  );
};
export default GroupCard;
