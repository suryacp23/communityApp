import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(false);

  const getGroups = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/group", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Error fetching groups");
        throw new Error(data.error || "Error fetching groups");
      } else {
        setGroups(data);
      }
    } catch (error) {
      console.log("Error at Get groups", error);
      toast.error("Error fetching groups: " + error?.message || error);
    } finally {
      setLoading(false);
    }
  };
  const createGroup = async (groupData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/group/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(groupData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error creating group");
      } else {
        console.log(data.group);
        setGroups((prev) => {
          [...prev, data.group];
        });
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Error at create group", error);
      toast.error("Error creating group: " + error?.message || error);
    } finally {
      setLoading(false);
    }
  };
  const joinRequest = async (userId, groupId) => {
    try {
      setLoading(true);
      const res = await fetch("/api/group/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, groupId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Unable to send request");
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Unable to send request", error);
      toast.error("Unable to send request: " + error?.message || error);
    } finally {
      setLoading(false);
    }
  };
  const approveRequest = async (requestId, action) => {
    try {
      setLoading(true);
      const res = await fetch("/api/group/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ requestId, action }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Failed to process the action"
        );
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Failed to process the action", error);
      toast.error("Failed to process the action: " + error?.message || error);
    } finally {
      setLoading(false);
    }
  };
  const addModerator = async (groupId, userId) => {
    try {
      setLoading(true);
      const res = await fetch("/api/group/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ groupId, userId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Failed to add moderator"
        );
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Failed to add moderator", error);
      toast.error("Failed to add moderator: " + error?.message || error);
    } finally {
      setLoading(false);
    }
  };
  const getGroupInfo = async (groupId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/group/${groupId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to fetch group");
      } else {
        toast.success(data.message);
        return data;
      }
    } catch (error) {
      console.log("Failed to fetch group" + error);
      toast.error("Failed to fetch group: " + error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  const groupValue = {
    groups,
    loading,
    getGroups,
    getGroupInfo,
    createGroup,
    joinRequest,
    approveRequest,
    addModerator,
  };
  return (
    <GroupContext.Provider value={groupValue}>{children}</GroupContext.Provider>
  );
};

export const useGroup = () => {
  return useContext(GroupContext);
};
