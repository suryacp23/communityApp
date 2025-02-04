import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Fetchevent, updateEvent } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate, useParams } from "react-router-dom";

const EditEvents = () => {
  const { user } = useAuth();
  const { eventId } = useParams();
  const imageRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  // Fetch event data
  const { data } = useQuery({
    queryKey: ["getevents", eventId],
    queryFn: () => Fetchevent(eventId),
  });

  // Initialize state based on fetched data
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    imageUrl: "",
    swags: false,
    Referencement: false,
    user: user?._id,
  });

  useEffect(() => {
    if (data?.event) {
      setFormData({
        eventName: data.event.title || "",
        description: data.event.description || "",
        imageUrl: data.event.imageUrl || "",
        swags: data.event.swags || false,
        Referencement: data.event.Referencement || false,
        user: user?._id,
      });
    }
  }, [data, user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData };

    if (file) {
      updatedFormData.file = file;
    }

    mutate(updatedFormData);
    navigate("/events");
  };

  // Mutation for updating event
  const { isLoading, mutate } = useMutation({
    mutationFn: (formData) => updateEvent(formData, eventId),
  });

  return (
    <div className="flex justify-center items-center min-h-screen p-6 sm:p-8 text-sm md:text-base lg:text-lg">
      <div className="bg-primary md:shadow-lg p-6 sm:p-8 rounded-lg w-full max-w-2xl flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col h-full w-full">
          <div className="flex flex-col gap-5 md:p-4 md:bg-[#1a1a1a] text-[#e0e0e0] rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-[#f0f0f0]">
              Event Details
            </h2>

            {/* Event Name Input */}
            <input
              type="text"
              name="eventName"
              className="w-full px-3 py-2 lg:py-3 border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
              placeholder="Enter event name"
              value={formData?.eventName}
              onChange={handleChange}
            />

            {/* Description Textarea */}
            <textarea
              name="description"
              className="w-full px-3 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888] min-h-[80px] max-h-[80px]"
              placeholder="Description"
              value={formData?.description}
              onChange={handleChange}
            />

            {/* Image Upload */}
            <input
              className="h-10 lg:h-12 w-full bg-[#222222] text-[#e0e0e0] rounded-md cursor-pointer border border-[#333333] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
              type="file"
              ref={imageRef}
              onChange={handleFileChange}
            />

            <div className="flex flex-col gap-4 text-sm text-[#e0e0e0]">
              <h2 className="text-lg font-semibold">Referencement And Swags</h2>
              <div className="p-3 border bg-[#222222]">
                <div className="h-1/5 w-4/5 md:w-1/3 justify-between flex items-center p-1">
                  <label htmlFor="Referencement" className="flex text-right">
                    Referencement
                  </label>
                  <input
                    type="checkbox"
                    id="Referencement"
                    name="Referencement"
                    checked={formData?.Referencement}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className="h-1/5 w-2/5 md:w-1/3 flex justify-between items-center p-1">
                  <label htmlFor="Swags" className="flex">
                    Swags
                  </label>
                  <input
                    type="checkbox"
                    id="Swags"
                    name="swags"
                    className="border rounded-md"
                    checked={formData?.swags}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  className="w-full bg-blue-500 text-white p-2 rounded-md"
                  disabled={isLoading}>
                  Submit ✅
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvents;
