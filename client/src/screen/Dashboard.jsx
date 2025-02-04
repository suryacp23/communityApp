import { useState } from "react";
import Profile from "../components/Profile";
import MyEvents from "../components/MyEvents";
import { LuCircleArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import MyGroups from "../components/MyGroups";
import RequestComponent from "../components/RequestComponent";
import { ToastContainer } from "react-toastify";
const tabs = [
  { name: "My Events", path: "/tab=events" },
  { name: "Profile", path: "/tab=profile" },
  { name: "Groups", path: "/tab=groups" },
  { name: "Requests", path: "/tab=requests" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(tabs[1].path);
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto">
      {/* Tab Headers */}
      <div
        onClick={() => navigate("/events")}
        className="flex items-center gap-2 rounded-md absolute border-2 border-gray-500 hover:bg-gray-600 px-2 py-1 top-2 left-2 text-white cursor-pointer">
        <LuCircleArrowLeft />
        <p>Back</p>
      </div>
      <div className="flex justify-around items-center border-b border-gray-700 py-2 mt-10 sm:mt-0">
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
            `}>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 text-gray-300 text-sm md:text-lg">
        {activeTab === "/tab=events" && <MyEvents />}
        {activeTab === "/tab=profile" && <Profile />}
        {activeTab === "/tab=groups" && <MyGroups />}
        {activeTab === "/tab=requests" && <RequestComponent />}
      </div>
      <ToastContainer />
    </div>
  );
}
