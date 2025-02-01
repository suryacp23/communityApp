import React, { useState } from "react";
import GroupSidebar from "../components/GroupSidebar";
import GroupChatSection from "../components/GroupChatSection";

const GroupV1 = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex p-2 h-screen gap-2">
      <GroupSidebar
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <GroupChatSection
        selectedGroup={selectedGroup}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default GroupV1;
