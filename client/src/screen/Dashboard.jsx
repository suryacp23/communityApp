import { useState } from "react";
import Requests from "../components/Requests";

const tabs = [
  { name: "My Events", path: "/tab=events" },
  { name: "Groups", path: "/tab=groups" },
  { name: "Requests", path: "/tab=requests" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0].path);

  return (
    <div className="w-full mx-auto">
      {/* Tab Headers */}
      <div className="flex justify-around border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => setActiveTab(tab.path)}
            className={`px-4 py-2 text-sm font-medium
              ${
                activeTab === tab.path
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400"
              }
            `}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 text-gray-300">
        {/* {activeTab === "/tab=events" && <MyEvents/>}
        {activeTab === "/tab=groups" && <MyGroups/>} */}
        {activeTab === "/tab=requests" && <Requests />}
      </div>
    </div>
  );
}
